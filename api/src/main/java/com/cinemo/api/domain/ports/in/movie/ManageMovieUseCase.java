package com.cinemo.api.domain.ports.in.movie;

import com.cinemo.api.domain.Movie;

public interface ManageMovieUseCase {
    Movie create(Movie movie);
}
