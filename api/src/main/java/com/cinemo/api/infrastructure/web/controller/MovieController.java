package com.cinemo.api.infrastructure.web.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.Movie;
import com.cinemo.api.domain.ports.in.movie.ManageMovieUseCase;
import com.cinemo.api.domain.ports.in.movie.RetrieveMovieUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.movie.MovieDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.movie.MovieRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.movie.MovieResponseDto;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/movie")
@RequiredArgsConstructor
public class MovieController {

    private final ManageMovieUseCase manageMovieUseCase;
    private final RetrieveMovieUseCase retrieveMovieUseCase;
    private final MovieDtoMapper movieDtoMapper;


    @PostMapping
    public ResponseEntity<MovieResponseDto> createMovie(@Valid @RequestBody MovieRequestDto requestDto){
        Movie movie = movieDtoMapper.toDomain(requestDto);
        Movie movieSaved = manageMovieUseCase.create(movie);

        return ResponseEntity.status(HttpStatus.CREATED).body(movieDtoMapper.toResponse(movieSaved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<MovieResponseDto>> getById(@PathVariable Long id){
        Optional<Movie> movie = retrieveMovieUseCase.getById(id);
        Optional<MovieResponseDto> responseDto = movie.map(movieDtoMapper::toResponse);

        return ResponseEntity.ok(responseDto);
    }
}
