interface Seat {
    id: string;
    status: string
};

type SeatingArray = Seat[][];

interface SeatingDataProps {
    movie: Movie;
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

interface LocationState {
    selectedSeats: Seat[];
    selectedMovie: Movie;
}

interface BookingDetails {
    movieId: string;
    movieTitle: string;
    seats: Seat[];
    email: string;
    phone: string;
    totalPrice: number;
}

interface PageContextType {
    activePage: string;
    setActivePage: (page: string) => void;
}

export type { Seat, SeatingArray, SeatingDataProps, Movie, MovieContainerProps, LocationState, BookingDetails, PageContextType };