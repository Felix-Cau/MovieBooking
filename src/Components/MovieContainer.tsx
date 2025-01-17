import { MovieContainerProps } from "../ts/inferfaces";

function MovieContainer({movies, selectedMovie, onMovieChange }: MovieContainerProps) {
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            onMovieChange(event.target.value);
        };
    
        return (
            <div className="movie-container">
                <label htmlFor="movie">Pick a movie:</label>
                <select name="movie" id="movie" value={selectedMovie} onChange={handleChange}>
                    {movies.map((movie) => (
                        <option key={movie.movieId} value={movie.movieId}>
                            {movie.title} ({movie.price} kr)
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    export default MovieContainer;