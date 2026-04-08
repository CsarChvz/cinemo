package com.cinemo.api.application.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import com.cinemo.api.application.dto.CinemaResponseDTO;
import com.cinemo.api.application.dto.CinemaWithDistance;
import com.cinemo.api.domain.Cinema;
import com.cinemo.api.domain.ports.in.cinema.ManageCinemaUseCase;
import com.cinemo.api.domain.ports.in.cinema.RetrieveCinemaUseCase;
import com.cinemo.api.domain.ports.in.cinema.SearchCinemaUseCase;
import com.cinemo.api.domain.ports.out.CinemaRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CinemaService implements ManageCinemaUseCase, RetrieveCinemaUseCase, SearchCinemaUseCase {
    private final CinemaRepositoryPort cinemaRepositoryPort;
    private static final double INF = 1e9;

    @Override
    public Cinema create(Cinema cinema) {
        return cinemaRepositoryPort.save(cinema);
    }

    @Override
    public List<Cinema> getCinemas() {
        return cinemaRepositoryPort.findAll();
    }

    @Override
    public Optional<Cinema> getById(Long id) {
        return cinemaRepositoryPort.findById(id);
    }

    @Override
    public void delete(Cinema cinema) {
        cinemaRepositoryPort.delete(cinema);
    }

    @Override
    public Cinema update(Cinema cinema) {
        return cinemaRepositoryPort.modify(cinema);
    }

    @Override
    public List<Cinema> getCinemasByMunicipalityId(Long municipalityId) {
        return cinemaRepositoryPort.findByMunicipalityId(municipalityId);
    }

    @Override
    public List<CinemaResponseDTO> getNearest(double lat, double lng, double radius) {
        List<Cinema> cinemas = cinemaRepositoryPort.findAll();
        int n = cinemas.size();
        if (n == 0)
            return List.of();

        System.out.println("\n--- [ PROCESANDO GRAFO DE CINES ] ---");

        // 1. Construir matriz inicial (Adyacencia)
        double[][] matrix = buildInitialMatrix(cinemas);
        printMatrix("1. MATRIZ DE ADYACENCIA (Threshold 50km)", matrix, cinemas);

        // 2. Ejecutar Floyd-Warshall
        double[][] shortestPaths = runFloydWarshall(matrix, n);
        printMatrix("2. MATRIZ DE CAMINOS MÍNIMOS (Floyd-Warshall)", shortestPaths, cinemas);

        // 3. Punto de entrada (Cine más cercano al usuario)
        int closestCinemaIndex = 0;
        double minFinishDist = INF;

        for (int i = 0; i < n; i++) {
            double d = calculateHaversine(lat, lng, cinemas.get(i).getLatitude(), cinemas.get(i).getLongitude());
            if (d < minFinishDist) {
                minFinishDist = d;
                closestCinemaIndex = i;
            }
        }

        final int startNode = closestCinemaIndex;
        final double distToGraph = minFinishDist;

        System.out.println(">>> Usuario en [" + lat + ", " + lng + "]");
        System.out.println(">>> Cine de entrada: " + cinemas.get(startNode).getName() + " ("
                + String.format("%.2f", distToGraph) + " km)");

        return cinemas.stream()
                .map(cinema -> {
                    // Usamos una búsqueda simple para el índice en la lista original
                    int targetIndex = 0;
                    for (int i = 0; i < n; i++) {
                        if (cinemas.get(i).getId().equals(cinema.getId())) {
                            targetIndex = i;
                            break;
                        }
                    }

                    double totalDist = distToGraph + shortestPaths[startNode][targetIndex];
                    return new CinemaWithDistance(cinema, totalDist);
                })
                .filter(item -> item.distance() <= radius)
                .sorted(Comparator.comparing(CinemaWithDistance::distance))
                .peek(item -> System.out.println("Filtrado: " + item.cinema().getName() + " - "
                        + String.format("%.2f", item.distance()) + " km"))
                .map(item -> new CinemaResponseDTO(item.cinema(), item.distance()))
                .toList();
    }

    private double[][] runFloydWarshall(double[][] dist, int n) {
        // Hacemos una copia para no modificar la original (Inmutabilidad)
        double[][] res = dist.clone();

        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (res[i][k] + res[k][j] < res[i][j]) {
                        res[i][j] = res[i][k] + res[k][j];
                    }
                }
            }
        }
        return res;
    }

    private double[][] buildInitialMatrix(List<Cinema> nodes) {
        int n = nodes.size();
        double[][] matrix = new double[n][n];
        double threshold = 50.0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    matrix[i][j] = 0;
                } else {
                    double d = calculateHaversine(
                            nodes.get(i).getLatitude(), nodes.get(i).getLongitude(),
                            nodes.get(j).getLatitude(), nodes.get(j).getLongitude());
                    // Si están "cerca", creamos una arista en el grafo
                    matrix[i][j] = (d <= threshold) ? d : INF;
                }
            }
        }
        return matrix;
    }

    private double calculateHaversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radio de la Tierra en km

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    private void printMatrix(String title, double[][] matrix, List<Cinema> cinemas) {
        System.out.println("\n>> " + title);
        int n = matrix.length;

        // Imprimir cabecera con nombres cortos
        System.out.print("       ");
        for (int i = 0; i < n; i++) {
            System.out.printf("%-8s", "C" + i);
        }
        System.out.println();

        for (int i = 0; i < n; i++) {
            System.out.printf("%-7s", "C" + i + ": "); // Fila
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] >= INF) {
                    System.out.printf("%-8s", "∞");
                } else {
                    System.out.printf("%-8.1f", matrix[i][j]);
                }
            }
            System.out.println();
        }
        System.out.println("---------------------------------------------------------");
    }

}
