import { useEffect, useState } from 'react';
import { FormValues, Movie } from '../ts/interfaces';
import { getMovies, updateMovie, deleteMovie } from '../Data/api';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function Admin(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovies();
                if (Array.isArray(moviesData)) {
                    setMovies(moviesData);
                } else {
                    console.log('Failed to load movies as admin.');
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
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
                console.log('Failed to delete movie.');
            }
        } catch (error) {
            console.error('Error deleding movie:', error);
        }
    }

    const formik = useFormik<FormValues>({
        initialValues: {
            title: currentMovie?.title || '',
            price: currentMovie?.price || 0,
        },
        enableReinitialize: true,
        validate: (values) => {
            const errors: { title?: string; price?: string } = {};

            if (!values.title || values.title.trim().length < 3) {
                errors.title = 'Title must be at least 3 characters long.';
            }

            if (!values.price || Number(values.price) <= 0) {
                errors.price ='Price must be a positive number.';
            }
            return errors;
        },
        onSubmit: async (values) => {
            if (currentMovie) {
                const updatedMovie = { ...currentMovie, ...values };
                try {
                    const updateStatus = await updateMovie(updatedMovie);
                    if (updateStatus) {
                        try {
                            const updatedMovies = await getMovies();
                            setMovies(updatedMovies);
                            setShowEdit(false);
                            setCurrentMovie(null);
                        } catch {
                            console.log('Coulnd refetch movies after update.')
                        }
                    } else {
                        console.log('Admin couldnt update movie')
                    }
                } catch {
                    console.log('Movie update didnt work in admin page.')
                }
            }
        }
    })

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
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                required
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <div className='error'>{formik.errors.title}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                required
                            />
                            {formik.touched.price && formik.errors.price ? (
                                <div className='error'>{formik.errors.price}</div>
                            ) : null}
                        </div>
                        <button type="submit">Update</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default Admin;