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

    // Método privado para inicializar el objeto de dominio
    private SeatStatus createInitialStatus(Long functionId, Long seatId) {
        SeatStatus newStatus = new SeatStatus();
        newStatus.setSeatId(seatId);
        newStatus.setMovieScreeningId(functionId);
        newStatus.setStatus("AVAILABLE");
        return newStatus;
    }

    @Override
    public SeatStatus selectSeat(Long functionId, Long seatId, Long userId) {
        System.out.println("\n--- 🖱️ OPERACIÓN: SELECCIONAR ASIENTO ---");
        System.out.println("Contexto: Usuario " + userId + " | Función " + functionId + " | Asiento " + seatId);

        SeatStatus seatStatus = seatStatusRepositoryPort.findBySeatIdAndMovieScreeningId(seatId, functionId)
                .orElseGet(() -> {
                    System.out.println("✨ [LAZY] El estado no existía en DB, creando uno nuevo como AVAILABLE...");
                    return createInitialStatus(functionId, seatId);
                });

        if (!"AVAILABLE".equals(seatStatus.getStatus())) {
            System.out.println("❌ [ERROR] Intento de selección fallido: Asiento ocupado.");
            throw new RuntimeException("Asiento no disponible");
        }

        // Pila
        String keyStack = userId + "-" + functionId;
        SelectionStack stack = selectionStack.computeIfAbsent(keyStack, k -> new SelectionStack());
        stack.push(seatId);
        System.out.println("📥 [STACK] Asiento " + seatId + " agregado a la pila del usuario. Tamaño actual: "
                + (selectionStack.get(keyStack).isEmpty() ? 0 : "n"));

        seatStatus.setStatus("RESERVED_TEMP");
        seatStatus.setReservedAt(LocalDateTime.now());

        return seatStatusRepositoryPort.save(seatStatus);
    }

    @Override
    public Long undoLastSelection(Long functionId, Long userId) {
        System.out.println("\n--- ⏪ OPERACIÓN: UNDO (DESHACER) ---");
        String keyStack = userId + "-" + functionId;
        SelectionStack stack = selectionStack.get(keyStack);

        if (stack == null || stack.isEmpty()) {
            System.out.println("⚠️ [STACK] Nada que deshacer para el usuario " + userId);
            throw new RuntimeException("No hay selecciones para deshacer");
        }

        Long seatId = stack.pop();
        System.out.println("📤 [STACK] Pop realizado. Asiento liberado: " + seatId);

        SeatStatus seatStatus = seatStatusRepositoryPort.findBySeatIdAndMovieScreeningId(seatId, functionId)
                .orElseThrow();
        seatStatus.setStatus("AVAILABLE");
        seatStatusRepositoryPort.save(seatStatus);

        return seatId;
    }

    @Override
    public void joinWaitlist(Long functionId, Long seatId, Long userId) {
        System.out.println("\n--- 👥 OPERACIÓN: JOIN WAITLIST ---");
        String queueKey = seatId + "-" + functionId;

        System.out.println("⏳ [QUEUE] Usuario " + userId + " entrando a la cola del asiento " + seatId);
        waitingQueue.computeIfAbsent(queueKey, q -> new WaitingQueue()).encolar(userId);
    }

    @Override
    public Long getWaitlistPosition(Long functionId, Long seatId, Long userId) {
        String queueKey = seatId + "-" + functionId;
        WaitingQueue queue = waitingQueue.get(queueKey);

        if (queue == null || queue.isEmpty()) {
            return null;
        }

        Long nextUser = queue.desencolar();
        System.out.println("🔔 [QUEUE] Turno otorgado. Siguiente usuario en fila: " + nextUser);
        return nextUser;
    }

    @Override
    public void releaseSeat(Long functionId, Long seatId) {
        seatStatusRepositoryPort.findBySeatIdAndMovieScreeningId(seatId, functionId)
                .ifPresent(status -> {
                    status.setStatus("AVAILABLE");
                    status.setReservedAt(null); // Limpiamos la fecha de reserva
                    seatStatusRepositoryPort.save(status);
                });
    }

    @Override
    public void notifyNext(Long functionId, Long seatId) {
        System.out.println("\n--- 🔔 [WAITLIST] PROCESANDO SIGUIENTE EN COLA ---");
        String queueKey = seatId + "-" + functionId;

        WaitingQueue queue = waitingQueue.get(queueKey);

        if (queue != null && !queue.isEmpty()) {
            Long nextUserId = queue.desencolar();

            System.out.println("👤 [FIFO] Usuario " + nextUserId + " es el siguiente para el asiento " + seatId);

            try {
                this.selectSeat(functionId, seatId, nextUserId);

                System.out.println("✅ [AUTO-SELECT] Asiento asignado exitosamente al usuario en espera.");

            } catch (Exception e) {

                System.err.println("⚠️ [ERROR] No se pudo asignar al usuario " + nextUserId
                        + ". Reintentando con el siguiente...");
                notifyNext(functionId, seatId); // Recursión para el siguiente en fila
            }
        } else {
            System.out.println(
                    "🍃 [QUEUE] La cola está vacía. El asiento " + seatId + " queda disponible para el público.");

            SeatStatus seatStatus = seatStatusRepositoryPort.findBySeatIdAndMovieScreeningId(seatId, functionId)
                    .orElseThrow();

            seatStatus.setStatus("AVAILABLE");
            seatStatus.setReservedAt(null);
            seatStatusRepositoryPort.save(seatStatus);
        }
    }
}   
