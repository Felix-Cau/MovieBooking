import { useEffect, useState } from "react";
import { Movie } from "../ts/interfaces";
import { getMovies, updateMovie, deleteMovie } from "../Data/api";

function Admin(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [showEdit, setShowEdit] = useState(false);
    // const [isSubmitFeedback, setSubmitFeedback] = useState<boolean>(false);
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)

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

    function handlePressEdit(movieId: string) {
        const movieToEdit = movies.find((movie) => movie.id === movieId);
        if (movieToEdit) {
            setCurrentMovie(movieToEdit);
            setShowEdit(true);
        }
    };

    async function handleDelete(movieId: string) {
            const deleteStatus = await deleteMovie(movieId);
            if (deleteStatus) {
                setMovies((currentMovies) => currentMovies.filter((movie) => movie.id !== movieId));
            } else {
                console.log("Failed to delete movie.");
            }
        }

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
                    setMovies((currentMovies) => currentMovies.map((movie) => movie.id === currentMovie.id ? currentMovie : movie));
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