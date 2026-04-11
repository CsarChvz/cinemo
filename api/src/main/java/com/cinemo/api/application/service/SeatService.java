package com.cinemo.api.application.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cinemo.api.domain.Seat;
import com.cinemo.api.domain.ports.in.seat.ManageSeatUseCase;
import com.cinemo.api.domain.ports.in.seat.RetrieveSeatUseCase;
import com.cinemo.api.domain.ports.out.SeatRepositoryPort;
import com.cinemo.api.domain.structs.ListaAsientos;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SeatService implements ManageSeatUseCase, RetrieveSeatUseCase {

    private final SeatRepositoryPort seatRepositoryPort;
    // Cache temporal para no reconstruir la estructura de datos en cada click
    private final Map<Long, ListaAsientos> listasPorSala = new HashMap<>();

    @Override
    public List<Seat> getSeatsByRoom(Long roomId) {
        if (listasPorSala.containsKey(roomId)) {
            System.out.println("📦 [CACHÉ] Recuperando lista de asientos para Sala ID: " + roomId);
            return listasPorSala.get(roomId).toList();
        }

        System.out.println("🔍 [DB] Cargando asientos desde BD para Sala ID: " + roomId);
        List<Seat> seatsFromDb = seatRepositoryPort.findByRoomId(roomId);

        ListaAsientos nuevaLista = new ListaAsientos();
        System.out.println("🏗️ [STRUCT] Insertando asientos en ListaAsientos personalizada...");
        for (Seat s : seatsFromDb) {
            nuevaLista.insertar(s);
        }

        listasPorSala.put(roomId, nuevaLista);
        return nuevaLista.toList();
    }

    @Override
    public Seat createSeat(Seat seat) {
        Seat saved = seatRepositoryPort.save(seat);
        System.out.println("🆕 [CREATE] Asiento guardado. Actualizando estructura de datos en memoria...");

        listasPorSala.computeIfAbsent(saved.getRoomId(), k -> new ListaAsientos())
                .insertar(saved);

        return saved;
    }

    @Override
    public List<Seat> generateSeats(Long roomId, Integer capacity, Integer columns) {
        int rows = (int) Math.ceil((double) capacity / columns);
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        List<Seat> seatsGenerated = new ArrayList<>();

        for (int f = 0; f < rows && f < 26; f++) {
            for (int c = 1; c <= columns; c++) {

                Seat seat = new Seat();
                seat.setRoomId(roomId);
                seat.setRowLetter(String.valueOf(letters.charAt(f)));
                seat.setSeatNumber(c);

                seatsGenerated.add(seat);
            }
        }

        return seatRepositoryPort.saveAll(seatsGenerated);
    }

    @Override
    public List<Seat> saveAll(List<Seat> seats) {
        return seatRepositoryPort.saveAll(seats);
    }
}