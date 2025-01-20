import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookingDetails, Movie, SeatingArray } from "../ts/interfaces";
import { getAllBookings, getMovies, deleteBooking, updateMovie } from "../Data/api";

function ManageBookings() {
    const [allBookings, setAllBookings] = useState<BookingDetails[]>([]);
    const [email, setEmail] = useState('');
    const [filteredBookings, setFilteredBookings] = useState<BookingDetails[]>([]);
    const [showBookings, setShowBookings] = useState<boolean>(false);
    const [noBookingsMessage, setNoBookingsMessage] = useState<boolean>(false);
    const [allMovies, setAllMovies] = useState<Movie[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingData = await getAllBookings();
                if (Array.isArray(bookingData)) {
                    setAllBookings(bookingData);
                } else {
                    console.log("Failed to load movies as admin.");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }

        };
        fetchBookings();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovies();
                if (Array.isArray(moviesData)) {
                    setAllMovies(moviesData);
                } else {
                    console.log("Failed to load movies as admin.");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    async function handleDelete(bookingId?: string) {
        if (!bookingId) {
            console.error('Booking ID is undefined')
            return;
        }

        const bookingToDelete = allBookings.find((booking) => booking.id === bookingId);
        if (!bookingToDelete) {
            console.error("Booking not found");
            return;
        }

        const { movieId, seats } = bookingToDelete;

        const movieToUpdate = allMovies.find((movie) => movie.id === movieId);

        if (!movieToUpdate) {
            console.error('Movie not found');
            return;
        }

        const updatedSeatingData: SeatingArray = movieToUpdate.seatingData.map((row) =>
            row.map((seat) => {
                if (seats.some((selectedSeat) => selectedSeat.id === seat.id)) {
                    seat.status = String('available');
                }
                return seat;
            })
        );

        const newVersionOfMovieToSave: Movie = {
            ...movieToUpdate,
            seatingData: updatedSeatingData,
        };

        try {
            const updateStatus = await updateMovie(newVersionOfMovieToSave);
            if (!updateStatus) {
                console.log('Movie update failed from manage booking');
                return;
            }

            const deleteStatus = await deleteBooking(String(bookingToDelete.id));
            if (deleteStatus) {
                setAllBookings((allBookings) => allBookings.filter((booking) => booking.id !== bookingId));

                setFilteredBookings((oldFilteredBookings) => {
                    const updatedFilteredBookings = oldFilteredBookings.filter((booking) => booking.id !== bookingId);

                    if (updatedFilteredBookings.length > 0) {
                        setShowBookings(true);
                        setNoBookingsMessage(false);
                    } else {
                        setShowBookings(false);
                        setNoBookingsMessage(true);
                    }
                    return updatedFilteredBookings;
                })
            } else {
                console.log("Failed to delete movie.");
            }
        } catch (error) {
            console.error("Error deleding movie:", error);
        }
    }

    function handleShowBookings() {
        if (!email.trim()) {
            setNoBookingsMessage(true);
            setShowBookings(false);
            return;
        }
        const filtered = allBookings.filter((booking) => booking.email.toLowerCase() === email.toLocaleLowerCase());

        if (filtered.length > 0) {
            setFilteredBookings(filtered);
            setShowBookings(true);
            setNoBookingsMessage(false);
        } else {
            setFilteredBookings([]);
            setShowBookings(false);
            setNoBookingsMessage(true);
        }
    }

    return (
        <div>
            {!showBookings && (
                <div className="admin-container">
                    <h2>Enter your e-mail to get the bookings</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value.trim())}
                        className="email-input"
                    />
                    <button onClick={handleShowBookings}>Show bookings</button>
                    {noBookingsMessage && (
                        <p>No bookings found for that e-mail, please try agian.</p>
                    )}
                </div>
            )}
            {showBookings && (
                <div className="bookings-container">
                    <h1>Your bookings</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Movie Title</th>
                                <th>Amount of seats</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.name}</td>
                                    <td>{booking.movieTitle}</td>
                                    <td>{booking.seats.length}</td>
                                    <td>{booking.totalPrice} SEK</td>
                                    <td>
                                        <button onClick={() => handleDelete(booking.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
                </div>
            )}
        </div>
    );
};


export default ManageBookings;