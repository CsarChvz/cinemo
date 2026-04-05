package com.cinemo.api.infrastructure.config;

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
            MovieJpaRepository movieRepo,
            MovieScreeningJpaRepostory screeningRepo) {

        return args -> {
            if (stateRepo.count() > 0) {
                System.out.println("⚡ La base de datos ya contiene información. Se omite el Seed inicial.");
                return;
            }

            System.out.println("🌱 Iniciando el poblado masivo de la base de datos...");

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
            System.out.println("✅ Estados y Municipios guardados.");

            // ==========================================
            // 3 & 4. CINES Y SALAS
            // ==========================================
            List<CinemaRoomEntity> allSavedRooms = new ArrayList<>();
            int[] cinemaMunicipalityIndexes = { 0, 1, 9, 10, 17, 25, 29, 38, 40, 41 };

            for (int i = 0; i < 10; i++) {
                MunicipalityEntity targetMun = allSavedMunicipalities.get(cinemaMunicipalityIndexes[i]);

                CinemaEntity cinema = new CinemaEntity();
                cinema.setName("Cinemo " + targetMun.getName() + " Centro");
                cinema.setAddress("Av. Principal " + (100 + i) + ", " + targetMun.getName());
                cinema.setMunicipality(targetMun);
                cinema = cinemaRepo.save(cinema);

                for (int j = 1; j <= 2; j++) {
                    CinemaRoomEntity room = new CinemaRoomEntity();
                    room.setName("Sala " + j + (j == 1 ? " VIP" : " Tradicional"));
                    room.setRoomType(j == 1 ? "VIP" : "2D");
                    room.setCapacity(j == 1 ? 50 : 120);
                    room.setCinema(cinema);
                    room.setIsActive(true);
                    allSavedRooms.add(roomRepo.save(room));
                }
            }
            System.out.println("✅ 10 Cines y 20 Salas guardados.");

            // ==========================================
            // 5. PELÍCULAS (Ajustadas a los Enums de Zod/TS)
            // ==========================================
            String[][] movieData = {
                    { "Dune: Part Two", "Ciencia Ficcion", "166", "Denis Villeneuve", "B15" },
                    { "Kung Fu Panda 4", "Animacion", "94", "Mike Mitchell", "A" },
                    { "Godzilla x Kong: The New Empire", "Accion", "115", "Adam Wingard", "B" },
                    { "Civil War", "Thriller", "109", "Alex Garland", "C" },
                    { "Ghostbusters: Frozen Empire", "Comedia", "115", "Gil Kenan", "B" },
                    { "Oppenheimer", "Drama", "180", "Christopher Nolan", "C" },
                    { "Spider-Man: Across the Spider-Verse", "Animacion", "140", "Joaquim Dos Santos", "A" },
                    { "Barbie", "Comedia", "114", "Greta Gerwig", "B" },
                    { "The Batman", "Accion", "176", "Matt Reeves", "B15" },
                    { "Cinemo: The Origin", "Ciencia Ficcion", "120", "Cesar Chavez Rodriguez", "B15" } // Ajuste
                                                                                                        // especial
            };

            List<MovieEntity> allSavedMovies = new ArrayList<>();
            for (String[] data : movieData) {
                MovieEntity movie = new MovieEntity();
                movie.setTitle(data[0]);
                movie.setGenre(data[1]);
                movie.setDurationMin(Integer.parseInt(data[2]));
                movie.setDirector(data[3]);
                movie.setClassification(data[4]);
                movie.setPosterUrl("https://ejemplo.com/posters/" + data[0].replace(" ", "_").toLowerCase() + ".jpg");
                movie.setDescription("Sinopsis de " + data[0] + "...");
                movie.setProducer("Alan, Ricardo y Alex");
                movie.setReleaseYear(2024);
                movie.setIsActive(true);
                allSavedMovies.add(movieRepo.save(movie));
            }
            System.out.println("✅ 10 Películas guardadas.");

            // ==========================================
            // 6. FUNCIONES (SCREENINGS)
            // ==========================================
            LocalDateTime baseTime = LocalDateTime.now().plusDays(1).withHour(14).withMinute(0).withSecond(0);

            for (int i = 0; i < 40; i++) {
                CinemaRoomEntity room = allSavedRooms.get(i % allSavedRooms.size());
                MovieEntity movie = allSavedMovies.get(i % allSavedMovies.size());

                MovieScreeningEntity screening = new MovieScreeningEntity();
                screening.setMovie(movie);
                screening.setRoom(room);

                LocalDateTime startTime = baseTime.plusHours(3 * (i / allSavedRooms.size()));
                screening.setStart(startTime);
                screening.setEnd(startTime.plusMinutes(movie.getDurationMin()));

                screening.setTotalCapacity(room.getCapacity());
                screening.setTicketsRemaining(room.getCapacity());
                screening.setStatus("SCHEDULED");

                screeningRepo.save(screening);
            }
            System.out.println("✅ 40 Funciones programadas con éxito.");
            System.out.println("🚀 ¡Poblado de base de datos finalizado!");
        };
    }
}