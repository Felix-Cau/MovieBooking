interface Seat {
    id: string;
    status: string
};

type SeatingArray = Seat[][];

interface Movie {
    movieId: string;
    title: string;
    price: number;
    seatingData: SeatingArray;
}

export type { Seat, SeatingArray, Movie };