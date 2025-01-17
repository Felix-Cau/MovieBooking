import { useEffect, useState } from "react";
import MovieContainer from "./MovieContainer";
import SeatingData from "./SeatingData";
import { SeatingArray, Movie } from "../ts/inferfaces";
import { getMovies } from "../Data/api";

function Main() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<string>('');
    const [selectedSeatingData, setSelectedSeatingData] = useState<SeatingArray>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getMovies();
            if (Array.isArray(moviesData)) {
                setMovies(moviesData);

                if (moviesData.length > 0) {
                    setSelectedMovieId(moviesData[0].movieId);
                    setSelectedSeatingData(moviesData[0].seatingData);
                }
            } else {
                setSelectedSeatingData([]);
                console.log("Failed to load movies:");
            }
        };

        fetchMovies();
    }, []);

    const handleMovieChange = (movieId: string) => {
        setSelectedMovieId(movieId);
        const selected = movies.find((movie) => movie.movieId === movieId);
        setSelectedSeatingData(selected?.seatingData || []);
    };

    return (
        <>
            <MovieContainer
                movies={movies}
                selectedMovie={selectedMovieId}
                onMovieChange={handleMovieChange} />
            <ul className="showcase">
                <li>
                    <div className="seat"></div>
                    <small>Available</small>
                </li>
                <li>
                    <div className="seat selected"></div>
                    <small>Selected</small>
                </li>
                <li>
                    <div className="seat occupied"></div>
                    <small>Occupied</small>
                </li>
            </ul>
            <div className="container">
                <div className="screen"></div>
                <SeatingData seatingArray={selectedSeatingData} />
            </div>
            <p className="text">
                You have selected <span id="count">0</span> seats for a price of $
                <span id="total">0</span>
            </p>
            <script type="module" src="script.tsx"></script>
        </>
    );
}

export default Main;
