interface Seat {
    id: string;
    status: string
};

type SeatingArray = Seat[][];

interface SeatingDataProps {
    movie: Movie;
}

interface Movie {
    id: string;
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
    id: string;
    movieId: string;
    movieTitle: string;
    seats: Seat[];
    name: string;
    email: string;
    phone: string;
    totalPrice: number;
}

interface PageContextType {
    activePage: string;
    setActivePage: (page: string) => void;
}

interface FormValues {
    title: string;
    price: number;
}

interface FormValuesBooking {
    name: string;
    email: string;
    phone: string;
}

interface FormValuesManageBookings {
    email: string;
}

export type { Seat, SeatingArray, SeatingDataProps, Movie, MovieContainerProps, LocationState, BookingDetails, PageContextType, FormValues, FormValuesBooking, FormValuesManageBookings };