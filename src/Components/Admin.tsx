import { useEffect, useState } from "react";
import { Movie } from "../ts/interfaces";
import { getMovies, updateMovie, deleteMovie } from "../Data/api";
import { useNavigate } from "react-router-dom";

function Admin(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [showEdit, setShowEdit] = useState(false);
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovies();
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

    function handleNavigateToCreateMovie() {
        navigate('/createmovie', {
            state: {
                amountOfMovies: Number(movies.length),
            }
        });
    }

    function handlePressEdit(movieId: string) {
        const movieToEdit = movies.find((movie) => movie.id === movieId);
        if (movieToEdit) {
            setCurrentMovie(movieToEdit);
            setShowEdit(true);
        }
    };

    async function handleDelete(movieId: string) {
        try {
            const deleteStatus = await deleteMovie(movieId);
            if (deleteStatus) {
                setMovies((currentMovies) => currentMovies.filter((movie) => movie.id !== movieId));
            } else {
                console.log("Failed to delete movie.");
            }
        } catch (error) {
            console.error("Error deleding movie:", error);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (currentMovie) {
            setCurrentMovie({ ...currentMovie, [event.target.name]: event.target.value.trim() });
        }
    };

    async function handleUpdate(event: React.FormEvent) {
        event.preventDefault();
        if (currentMovie) {
            try {
                const updateStatus = await updateMovie(currentMovie);
                if (updateStatus) {
                    setMovies((currentMovies) => currentMovies.map((movie) => movie.id === currentMovie.id ? currentMovie : movie));
                    setShowEdit(false);
                    setCurrentMovie(null);
                } else {
                    console.log('Admin couldnt update movie')
                }
            } catch {
                console.log('Movie update didnt work in admin page.')
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
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>{movie.price} SEK</td>
                                <td>
                                    <button onClick={() => handlePressEdit(movie.id)}>Edit</button>
                                    <button onClick={() => handleDelete(movie.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleNavigateToCreateMovie}>Create new movie</button>
            </div>
            <div id='showEdit'>
                {showEdit && currentMovie && (
                    <form onSubmit={handleUpdate}>
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