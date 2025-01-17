import { useEffect, useState } from "react";
import { Movie } from "../ts/inferfaces";
import { getMovies, updateMovie } from "../Data/api";

function Admin(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [showEdit, setShowEdit] = useState(false);
    const [isSubmitFeedback, setSubmitFeedback] = useState<Boolean>(false);
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData: Movie[] = await getMovies();
                if (Array.isArray(moviesData)) {
                    setMovies(moviesData);
                } else {
                    console.log("Failed to load movies as admin.");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    function handlePressEdit(movieId: string) {
        const movieToEdit = movies.find((movie) => movie.movieId === movieId);
        if (movieToEdit) {
            setCurrentMovie(movieToEdit);
            setShowEdit(true);
        }
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (currentMovie) {
          setCurrentMovie({ ...currentMovie, [e.target.name]: e.target.value });
        }
      };
    

    async function handleUpdate(event: React.FormEvent) {
        event.preventDefault();
        if (currentMovie) {
            try {
                const updateStatus = await updateMovie(currentMovie);
                if (updateStatus) {
                    setMovies((currentMovies) => currentMovies.map((movie) => movie.movieId === currentMovie.movieId ? currentMovie : movie));
                    setShowEdit(false);
                    setCurrentMovie(null);
                } else {
                    console.log('Admin couldnt update movie')
                }
            } catch {
                console.log('Movie update didnt work in admin.')
            }
        }
    }

    return (
        <>
            <div className="admin-container">
                <h1>Admin Panel</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie: Movie) => (
                            <tr key={movie.movieId}>
                                <td>{movie.title}</td>
                                <td>{movie.price} SEK</td>
                                <td>
                                    <button onClick={() => handlePressEdit(movie.movieId)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div id='showEdit'>
                {showEdit && currentMovie && (
                    <form onSubmit={handleUpdate}>
                        <input type="hidden" name="movieId" value={currentMovie.movieId} />
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={currentMovie.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={currentMovie.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Update</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default Admin;