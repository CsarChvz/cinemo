package com.cinemo.api.infrastructure.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.MovieScreening;
import com.cinemo.api.domain.ports.in.movie_screening.ManageMovieScreeningUseCase;
import com.cinemo.api.domain.ports.in.movie_screening.RetrieveMovieScreeningUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.movie_screening.MovieScreeningDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.movie_screening.MovieScreeningRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.movie_screening.MovieScreeningResponseDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/movie-screenings")
@RequiredArgsConstructor
public class MovieScreeningController {
    private final ManageMovieScreeningUseCase manageMovieScreeningUseCase;
    private final RetrieveMovieScreeningUseCase retrieveMovieScreeningUseCase;
    private final MovieScreeningDtoMapper movieScreeningDtoMapper;

    @PostMapping
    public ResponseEntity<MovieScreeningResponseDto> create(@Valid @RequestBody MovieScreeningRequestDto requestDto) {
        MovieScreening domain = movieScreeningDtoMapper.toDomain(requestDto);
        MovieScreening saved = manageMovieScreeningUseCase.create(domain);
        return ResponseEntity.status(HttpStatus.CREATED).body(movieScreeningDtoMapper.toResponse(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieScreeningResponseDto> getById(@PathVariable Long id) {
        return retrieveMovieScreeningUseCase.getById(id)
                .map(movieScreeningDtoMapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<MovieScreeningResponseDto>> getAll() {
        List<MovieScreeningResponseDto> response = retrieveMovieScreeningUseCase.getAll().stream()
                .map(movieScreeningDtoMapper::toResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return retrieveMovieScreeningUseCase.getById(id)
                .map(screening -> {
                    manageMovieScreeningUseCase.delete(screening);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
