package com.cinemo.api.infrastructure.config;

import com.cinemo.api.domain.ports.out.PasswordEncoderPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.*;
import com.cinemo.api.infrastructure.persistence.jpa.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.*;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner seedDatabase(
            StateJpaRepository stateRepo,
            MunicipalityJpaRepository municipalityRepo,
            CinemaJpaRepository cinemaRepo,
            CinemaRoomJpaRepository roomRepo,
            SeatJpaRepository seatRepo, // 🔥 Agregado para poder guardar los asientos
            MovieJpaRepository movieRepo,
            MovieScreeningJpaRepostory screeningRepo,
            UserJpaRepository userRepo,
            PasswordEncoderPort passwordEncoder) {

        return args -> {
            if (stateRepo.count() > 0) {
                System.out.println("⚡ La base de datos ya contiene información. Se omite el Seed inicial.");
                return;
            }

            System.out.println("🌱 Iniciando poblado masivo: 20 cines con geolocalización...");

            // ==========================================
            // 1 & 2. ESTADOS Y MUNICIPIOS
            // ==========================================
            Map<String, List<String>> locations = new LinkedHashMap<>();
            locations.put("Jalisco|J11", Arrays.asList("Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Zapotlanejo",
                    "Tlajomulco", "Ayotlán", "Tequila", "Ocotlán", "Puerto Vallarta"));
            locations.put("Nuevo León|N11", Arrays.asList("Guadalupe", "Abasolo", "Apodaca", "Ciénega de Flores",
                    "General Zaragoza", "Iturbide", "Juárez", "Monterrey", "Salinas Victoria", "General Zuazua"));
            locations.put("Estado de México|E11", Arrays.asList("Cuautitlán Izcalli", "Chalco", "Aculco", "Atizapán",
                    "Chapultepec", "Ecatepec de Morelos", "Naucalpan de Juárez", "Morelos", "Texcoco", "Toluca"));
            locations.put("Chihuahua|C11", Arrays.asList("Ignacio Zaragoza", "Allende", "Valle de Zaragoza", "Rosario",
                    "Nonoava", "Matamoros", "Guadalupe y Calvo", "Coronado", "Delicias", "Galeana"));
            locations.put("Sinaloa|S11", Arrays.asList("Guasave", "Navolato", "Cosalá", "Angostura", "Mocorito"));

            List<MunicipalityEntity> allSavedMunicipalities = new ArrayList<>();

            for (Map.Entry<String, List<String>> entry : locations.entrySet()) {
                String[] stateData = entry.getKey().split("\\|");
                StateEntity state = new StateEntity();
                state.setName(stateData[0]);
                state.setCode(stateData[1]);
                state = stateRepo.save(state);

                for (String munName : entry.getValue()) {
                    MunicipalityEntity mun = new MunicipalityEntity();
                    mun.setName(munName);
                    mun.setState(state);
                    allSavedMunicipalities.add(municipalityRepo.save(mun));
                }
            }

            // ==========================================
            // 3, 4 & Asientos. 20 CINES, SALAS Y SUS ASIENTOS
            // ==========================================
            List<CinemaRoomEntity> allSavedRooms = new ArrayList<>();

            double[][] coords = {
                    { 20.6668, -103.3918 }, { 20.6748, -103.3590 }, { 20.7166, -103.4050 },
                    { 20.6820, -103.4617 }, { 20.6062, -103.3135 }, { 20.6244, -103.2435 },
                    { 20.4735, -103.4435 }, { 20.8833, -103.8333 }, { 20.6191, -105.2300 },
                    { 25.6766, -100.2565 }, { 25.6866, -100.3161 }, { 25.7785, -100.2331 },
                    { 25.7256, -100.3125 }, { 19.6444, -99.2158 }, { 19.6015, -99.0454 },
                    { 19.2826, -99.6557 }, { 28.6330, -106.0691 }, { 28.1923, -105.4741 },
                    { 25.5714, -108.4714 }, { 24.7303, -107.7011 }
            };

            int[] munIndexes = { 0, 0, 1, 1, 2, 3, 5, 7, 9, 10, 17, 12, 17, 20, 25, 29, 30, 38, 40, 41 };
            String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            for (int i = 0; i < 20; i++) {
                MunicipalityEntity targetMun = allSavedMunicipalities.get(munIndexes[i]);

                CinemaEntity cinema = new CinemaEntity();
                cinema.setName("Cinemo " + targetMun.getName() + " " + (i % 2 == 0 ? "Premium" : "Express"));
                cinema.setAddress("Calle " + (500 + i) + ", Col. " + targetMun.getName());
                cinema.setMunicipality(targetMun);
                cinema.setLatitude(coords[i][0]);
                cinema.setLongitude(coords[i][1]);
                cinema = cinemaRepo.save(cinema);

                for (int j = 1; j <= 3; j++) {
                    CinemaRoomEntity room = new CinemaRoomEntity();

                    // 🔥 Modificamos las capacidades y columnas
                    int capacity = (j == 1) ? 20 : 40;
                    int columns = (j == 1) ? 5 : 8; // 20/5 = 4 filas, 40/8 = 5 filas

                    room.setName("Sala " + j + (j == 1 ? " VIP" : " 2D"));
                    room.setRoomType(j == 1 ? "VIP" : "2D");
                    room.setCapacity(capacity);
                    room.setColumnsPerRow(columns);
                    room.setCinema(cinema);
                    room.setIsActive(true);

                    // Guardamos la sala y capturamos la entidad con su ID generado
                    CinemaRoomEntity savedRoom = roomRepo.save(room);
                    allSavedRooms.add(savedRoom);

                    // 🔥 Generación automática de asientos para la sala
                    int rows = (int) Math.ceil((double) capacity / columns);
                    List<SeatEntity> seatsToSave = new ArrayList<>();

                    for (int f = 0; f < rows && f < 26; f++) {
                        for (int c = 1; c <= columns; c++) {
                            SeatEntity seat = new SeatEntity();
                            seat.setRoom(savedRoom); // Usamos la entidad relacionada directamente
                            seat.setRowLetter(String.valueOf(letters.charAt(f)));
                            seat.setSeatNumber(c);
                            seatsToSave.add(seat);
                        }
                    }
                    // Guardamos todos los asientos de la sala de golpe (Batch insert)
                    seatRepo.saveAll(seatsToSave);
                }
            }
            System.out.println("✅ 20 Cines, 60 Salas y sus respectivos Asientos guardados.");
            // ==========================================
            // 5. PELÍCULAS
            // ==========================================
            // Se agregó un 6to elemento al arreglo con la URL real del póster
            String[][] movieData = {
                    { "Dune: Part Two", "Ciencia Ficcion", "166", "Denis Villeneuve", "B15",
                            "https://image.tmdb.org/t/p/w600_and_h900_face/6o5cJjA4srfvU52UKWaqPUuPPgl.jpg" },
                    { "Kung Fu Panda 4", "Animacion", "94", "Mike Mitchell", "A",
                            "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg" },
                    { "Godzilla x Kong", "Accion", "115", "Adam Wingard", "B",
                            "https://www.themoviedb.org/t/p/w600_and_h900_face/yJTk4eqQd9Yo5REpFbTSOMkbSgn.jpg" },
                    { "Civil War", "Thriller", "109", "Alex Garland", "C",
                            "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg" },
                    { "Ghostbusters", "Comedia", "115", "Gil Kenan", "B",
                            "https://www.themoviedb.org/t/p/w600_and_h900_face/gG8Tv060zoUwmeGEk8lGBULO9hw.jpg" },
                    { "Oppenheimer", "Drama", "180", "Christopher Nolan", "C",
                            "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
                    { "Spider-Man", "Animacion", "140", "Joaquim Dos Santos", "A",
                            "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
                    { "Barbie", "Comedia", "114", "Greta Gerwig", "B",
                            "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
                    { "The Batman", "Accion", "176", "Matt Reeves", "B15",
                            "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
                    { "Cinemo: The Origin", "Ciencia Ficcion", "120", "Cesar Chavez Rodriguez", "B15",
                            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80" }
            };

            List<MovieEntity> allSavedMovies = new ArrayList<>();
            for (String[] data : movieData) {
                MovieEntity movie = new MovieEntity();
                movie.setTitle(data[0]);
                movie.setGenre(data[1]);
                movie.setDurationMin(Integer.parseInt(data[2]));
                movie.setDirector(data[3]);
                movie.setClassification(data[4]);

                // 🔥 Ahora leemos la URL del índice 5
                movie.setPosterUrl(data[5]);

                movie.setDescription("Sinopsis de " + data[0]);
                movie.setProducer("Producciones Cinemo");
                movie.setReleaseYear(2024);
                movie.setIsActive(true);
                allSavedMovies.add(movieRepo.save(movie));
            }

            // ==========================================
            // 6. FUNCIONES (SCREENINGS)
            // ==========================================
            System.out.println("📅 Programando funciones variadas para la semana...");

            int[] preferredHours = { 10, 13, 16, 19, 22 };

            for (int i = 0; i < 80; i++) {
                CinemaRoomEntity room = allSavedRooms.get(i % allSavedRooms.size());
                MovieEntity movie = allSavedMovies.get(i % allSavedMovies.size());

                int dayOffset = i % 7;
                int hourIndex = (i + (i / allSavedRooms.size())) % preferredHours.length;
                int startHour = preferredHours[hourIndex];

                LocalDateTime startTime = LocalDateTime.now()
                        .plusDays(dayOffset + 1)
                        .withHour(startHour)
                        .withMinute(0)
                        .withSecond(0)
                        .withNano(0);

                LocalDateTime endTime = startTime.plusMinutes(movie.getDurationMin());

                MovieScreeningEntity screening = new MovieScreeningEntity();
                screening.setMovie(movie);
                screening.setRoom(room);
                screening.setStart(startTime);
                screening.setEnd(endTime);
                screening.setTotalCapacity(room.getCapacity());
                screening.setTicketsRemaining(room.getCapacity());
                screening.setStatus("SCHEDULED");

                screeningRepo.save(screening);
            }

            if (userRepo.count() == 0) {
                System.out.println("👤 Creando usuarios de prueba...");

                UserEntity admin1 = new UserEntity();
                admin1.setName("César Chávez");
                admin1.setUsername("admin");
                admin1.setEmail("admin@cinemo.com");
                admin1.setPassword(passwordEncoder.encode("admin123"));
                admin1.setRole("ADMIN");
                userRepo.save(admin1);

                UserEntity admin2 = new UserEntity();
                admin2.setName("Staff Cinemo");
                admin2.setUsername("staff");
                admin2.setEmail("staff@cinemo.com");
                admin2.setPassword(passwordEncoder.encode("staff123"));
                admin2.setRole("ADMIN");
                userRepo.save(admin2);

                UserEntity cliente = new UserEntity();
                cliente.setName("Juan Pérez");
                cliente.setUsername("user");
                cliente.setEmail("cliente@gmail.com");
                cliente.setPassword(passwordEncoder.encode("user123"));
                cliente.setRole("USER");
                userRepo.save(cliente);

                System.out.println("✅ Usuarios creados:");
                System.out.println("   - Admin: admin / admin123");
                System.out.println("   - Admin: staff / staff123");
                System.out.println("   - User:  user / user123");
            }
            System.out.println("🚀 Seed masivo completado con éxito.");
        };
    }
}