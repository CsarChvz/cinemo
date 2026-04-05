package com.cinemo.api.domain.ports.in.movie_screening;

import com.cinemo.api.domain.MovieScreening;

public interface ManageMovieScreeningUseCase {
    MovieScreening create(MovieScreening movieScreening);

    MovieScreening update(MovieScreening movieScreening);

    void delete(MovieScreening movieScreening);
}
