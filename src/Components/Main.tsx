import { useEffect, useState } from "react";
import MovieContainer from "./MovieContainer";
import SeatingData from "./SeatingData";
import { Movie } from "../ts/interfaces";
import { getMovies } from "../Data/api";

function Main() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie>({
        id: "",
        title: "",
        price: 0,
        seatingData: [],
    });

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovies();
                if (Array.isArray(moviesData) && moviesData.length > 0) {
                    setMovies(moviesData);
                    setSelectedMovie(moviesData[0]);
                } else {
                    console.error("Failed to load movies or no movies available.");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    function handleMovieChange(movieId: string) {
        const selected = movies.find((movie) => movie.id === movieId);
        if (selected) {
            setSelectedMovie(selected);
        }
    };

    return (
        <>
            <MovieContainer
                movies={movies}
                selectedMovie={selectedMovie.id}
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
                <SeatingData movie={selectedMovie} />
            </div>
        </>
    );
}

export default Main;
