import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking, updateMovie } from "../Data/api";
import { Movie, LocationState, SeatingArray } from "../ts/interfaces";

function BookTickets(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedSeats, selectedMovie } =
    (location.state as LocationState) || {
      selectedSeats: [],
      selectedMovie: undefined,
    };

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  if (!selectedMovie || !selectedSeats) {
    return <div>No booking information available.</div>;
  }

  const totalPrice = selectedSeats.length * selectedMovie.price;

  async function handleBooking() {
    const updatedSeatingData: SeatingArray = selectedMovie.seatingData.map((row) =>
      row.map((seat) => {
        if (selectedSeats.some((selectedSeat) => String(selectedSeat.id) === String(seat.id))) {
          seat.status = String("booked");
        }
        return seat;
      })
    );

    const updatedMovie: Movie = {
      ...selectedMovie,
      seatingData: updatedSeatingData,
    };
    
    const bookingDetails = {
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      seats: selectedSeats,
      email,
      phone,
      totalPrice,
    };

    try {
      const updateMovieStatus = await updateMovie(updatedMovie);
      if (!updateMovieStatus) {
        console.log('Movie update failed from booking');
        return;
      }

      const bookingStatus = await createBooking(bookingDetails);
      if (bookingStatus) {
        navigate("/");
      } else {
        console.log("Booking failed. Pleae try again.");
        return;
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="booking-container">
      <h2>Confirm Your Booking</h2>
      <p>
        <strong>Movie:</strong> {selectedMovie.title}
      </p>
      <p>
        <strong>Tickets:</strong> {selectedSeats.length} seat(s)
      </p>
      <p>
        <strong>Total Price:</strong> SEK{totalPrice}
      </p>

      <form className="booking-form">
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
      </form>

      <div className="button-group">
        <button className="cancel-button" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button className="confirm-button" onClick={handleBooking}>
          Confirm Booking
        </button>
        <p>If the booking is successful you will be redirected to the start page.</p>
      </div>
    </div>
  );
}

export default BookTickets;
