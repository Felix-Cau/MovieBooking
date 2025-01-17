interface Seat {
    id: string;
    status: string
};

type SeatingArray = Seat[][];

interface SeatingDataProps {
    seatingArray: SeatingArray;
}

interface Movie {
    movieId: string;
    title: string;
    price: number;
    seatingData: SeatingArray;
}

interface MovieContainerProps {
    movies: Movie[];
    selectedMovie: string;
    onMovieChange: (selectedMovieId: string) => void;
}

export type { Seat, SeatingArray, SeatingDataProps, Movie, MovieContainerProps };