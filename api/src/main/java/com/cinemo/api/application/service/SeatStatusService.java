package com.cinemo.api.application.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cinemo.api.domain.SeatStatus;
import com.cinemo.api.domain.ports.in.seat_status.SeatStatusUseCase;
import com.cinemo.api.domain.ports.out.SeatStatusRepositoryPort;
import com.cinemo.api.domain.structs.SelectionStack;
import com.cinemo.api.domain.structs.WaitingQueue;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SeatStatusService implements SeatStatusUseCase{
    private final SeatStatusRepositoryPort seatStatusRepositoryPort;

    // Pila por usuario+función: "userId-functionId" -> PilaSeleccion
    private final Map<String, SelectionStack> selectionStack = new HashMap<>();

    // Cola por asiento+función: "seatId-functionId" -> ColaEspera
    private final Map<String, WaitingQueue> waitingQueue = new HashMap<>();


    @Override
    public List<SeatStatus> getStatusByFunction(Long functionId) {
        return seatStatusRepositoryPort.findByMovieScreeningId(functionId);
    }

    @Override
    public SeatStatus selectSeat(Long functionId, Long seatId, Long userId) {
        // 1. Buscamos el estado. Si no existe, lo creamos "al vuelo"
        SeatStatus seatStatus = seatStatusRepositoryPort.findBySeatIdAndMovieScreeningId(seatId, functionId)
                .orElseGet(() -> createInitialStatus(functionId, seatId));

        // 2. Validamos disponibilidad
        if (!"AVAILABLE".equals(seatStatus.getStatus())) {
            throw new RuntimeException("Asiento no disponible");
        }

        String keyStack = userId + "-" + functionId;
        selectionStack.computeIfAbsent(keyStack, k -> new SelectionStack()).push(seatId);

        // 4. Actualizamos el estado a RESERVADO_TEMP
        seatStatus.setStatus("RESERVED_TEMP");
        seatStatus.setReservedAt(LocalDateTime.now());

        // 5. Guardamos (esto insertará si es nuevo o actualizará si ya existía)
        return seatStatusRepositoryPort.save(seatStatus);
    }

    // Método privado para inicializar el objeto de dominio
    private SeatStatus createInitialStatus(Long functionId, Long seatId) {
        SeatStatus newStatus = new SeatStatus();
        newStatus.setSeatId(seatId);
        newStatus.setMovieScreeningId(functionId);
        newStatus.setStatus("AVAILABLE");
        return newStatus;
    }

    @Override
    public Long undoLastSelection(Long functionId, Long userId) {
        // Obtenemos la pila de la función
        String keyStack = userId + "-" + functionId;
        SelectionStack stack = selectionStack.get(keyStack);

        if(stack == null || stack.isEmpty()){
            throw new RuntimeException("No hay selecciones para deshacer");
        }


        // Sacamos el ultimo asiento seleccionado
        Long seatId = stack.pop();

        // Liberamos el asiento que estaba ocupado
        SeatStatus seatStatus = seatStatusRepositoryPort.findBySeatIdAndMovieScreeningId(seatId, functionId).orElseThrow();
        seatStatus.setStatus("AVAILABLE");
        seatStatusRepositoryPort.save(seatStatus);

        return seatId;
    }


    // Metemos el usuario a la cola de espera
    @Override
    public void joinWaitlist(Long functionId, Long seatId, Long userId) {
        String queueKey = seatId + "-" + functionId;
        waitingQueue.computeIfAbsent(queueKey, q -> new WaitingQueue()).encolar(userId);
        
    }

    @Override
    public Long getWaitlistPosition(Long functionId, Long seatId, Long userId) {
        String queueKey = seatId + "-" + functionId;

        WaitingQueue queue = waitingQueue.get(queueKey);
        if(queue == null || queue.isEmpty()){
            return null;
        }

        return queue.desencolar(); // retorna userId del siguiente en espera
    }
}   
