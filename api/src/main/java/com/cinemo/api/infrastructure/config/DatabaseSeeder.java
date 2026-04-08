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
            // 3 & 4. 20 CINES Y SUS SALAS
            // ==========================================
            List<CinemaRoomEntity> allSavedRooms = new ArrayList<>();

            // Definición de 20 puntos (Lat, Lng) basados en los municipios creados
            double[][] coords = {
                    { 20.6668, -103.3918 }, // 0: GDL Centro
                    { 20.6748, -103.3590 }, // 1: GDL Oriente
                    { 20.7166, -103.4050 }, // 2: Zapopan Norte
                    { 20.6820, -103.4617 }, // 3: Zapopan Poniente (Cerca de UNIVA)
                    { 20.6062, -103.3135 }, // 4: Tlaquepaque
                    { 20.6244, -103.2435 }, // 5: Tonalá
                    { 20.4735, -103.4435 }, // 6: Tlajomulco
                    { 20.8833, -103.8333 }, // 7: Tequila
                    { 20.6191, -105.2300 }, // 8: Puerto Vallarta
                    { 25.6766, -100.2565 }, // 9: Guadalupe NL
                    { 25.6866, -100.3161 }, // 10: Monterrey Centro
                    { 25.7785, -100.2331 }, // 11: Apodaca
                    { 25.7256, -100.3125 }, // 12: San Nicolás (Monterrey área)
                    { 19.6444, -99.2158 }, // 13: Cuautitlán Izcalli
                    { 19.6015, -99.0454 }, // 14: Ecatepec
                    { 19.2826, -99.6557 }, // 15: Toluca
                    { 28.6330, -106.0691 }, // 16: Chihuahua Centro
                    { 28.1923, -105.4741 }, // 17: Delicias
                    { 25.5714, -108.4714 }, // 18: Guasave
                    { 24.7303, -107.7011 } // 19: Navolato
            };

            // Mapeo manual de qué municipio de 'allSavedMunicipalities' corresponde a cada
            // coord
            int[] munIndexes = { 0, 0, 1, 1, 2, 3, 5, 7, 9, 10, 17, 12, 17, 20, 25, 29, 30, 38, 40, 41 };

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
                    room.setName("Sala " + j + (j == 1 ? " IMAX" : " 2D"));
                    room.setRoomType(j == 1 ? "IMAX" : "2D");
                    room.setCapacity(j == 1 ? 80 : 150);
                    room.setCinema(cinema);
                    room.setIsActive(true);
                    allSavedRooms.add(roomRepo.save(room));
                }
            }
            System.out.println("✅ 20 Cines y 60 Salas guardados.");

            // ==========================================
            // 5. PELÍCULAS
            // ==========================================
            String[][] movieData = {
                    { "Dune: Part Two", "Ciencia Ficcion", "166", "Denis Villeneuve", "B15" },
                    { "Kung Fu Panda 4", "Animacion", "94", "Mike Mitchell", "A" },
                    { "Godzilla x Kong", "Accion", "115", "Adam Wingard", "B" },
                            { "Civil War", "Thriller", "109", "Alex Garland", "C" },
                    { "Ghostbusters", "Comedia", "115", "Gil Kenan", "B" },
                            { "Oppenheimer", "Drama", "180", "Christopher Nolan", "C" },
                    { "Spider-Man", "Animacion", "140", "Joaquim Dos Santos", "A" },
                            { "Barbie", "Comedia", "114", "Greta Gerwig", "B" },
                    { "The Batman", "Accion", "176", "Matt Reeves", "B15" },
                    { "Cinemo: The Origin", "Ciencia Ficcion", "120", "Cesar Chavez Rodriguez", "B15" }
            };

            List<MovieEntity> allSavedMovies = new ArrayList<>();
            for (String[] data : movieData) {
                MovieEntity movie = new MovieEntity();
                movie.setTitle(data[0]);
                movie.setGenre(data[1]);
                movie.setDurationMin(Integer.parseInt(data[2]));
                movie.setDirector(data[3]);
                movie.setClassification(data[4]);
                movie.setPosterUrl("https://ejemplo.com/posters/" + data[0].toLowerCase().replace(" ", "_") + ".jpg");
                movie.setDescription("Sinopsis de " + data[0]);
                movie.setProducer("Producciones Cinemo");
                movie.setReleaseYear(2024);
                movie.setIsActive(true);
                allSavedMovies.add(movieRepo.save(movie));
            }

            // ==========================================
            // 6. FUNCIONES (SCREENINGS) - Poblado denso
            // ==========================================
            LocalDateTime baseTime = LocalDateTime.now().plusDays(1).withHour(10).withMinute(0);

            for (int i = 0; i < 80; i++) {
                CinemaRoomEntity room = allSavedRooms.get(i % allSavedRooms.size());
                MovieEntity movie = allSavedMovies.get(i % allSavedMovies.size());

                MovieScreeningEntity screening = new MovieScreeningEntity();
                screening.setMovie(movie);
                screening.setRoom(room);
                screening.setStart(baseTime.plusHours(i % 12));
                screening.setEnd(screening.getStart().plusMinutes(movie.getDurationMin()));
                screening.setTotalCapacity(room.getCapacity());
                screening.setTicketsRemaining(room.getCapacity());
                screening.setStatus("SCHEDULED");
                screeningRepo.save(screening);
            }
            System.out.println("✅ 80 Funciones programadas.");
            if (userRepo.count() == 0) {
                System.out.println("👤 Creando usuarios de prueba...");

                // Usuario Administrador
                UserEntity admin = new UserEntity();
                admin.setName("César Chávez");
                admin.setUsername("admin");
                admin.setEmail("admin@cinemo.com");
                // Usamos el puerto para que se guarde el hash real
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                userRepo.save(admin);

                // Usuario Cliente estándar
                UserEntity user = new UserEntity();
                user.setName("Usuario de Prueba");
                user.setUsername("user");
                user.setEmail("user@example.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole("USER");
                userRepo.save(user);

                System.out.println("✅ Usuarios creados: admin/admin123 y user/user123");
            }
            System.out.println("🚀 Seed masivo completado con éxito.");
        };
    }
}