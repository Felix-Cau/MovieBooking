import { useLocation, useNavigate } from "react-router-dom";
import { createBooking, updateMovie } from "../Data/api";
import { Movie, LocationState, SeatingArray, FormValuesBooking } from "../ts/interfaces";
import { useFormik } from "formik";

function BookTickets(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const generateGUID = (): string => {
    return crypto.randomUUID();
  };

  const { selectedSeats, selectedMovie } =
    (location.state as LocationState) || {
      selectedSeats: [],
      selectedMovie: undefined,
    };

  const totalPrice = selectedSeats.length * selectedMovie.price;

  const formik = useFormik<FormValuesBooking>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: (values) => {
      const errors: { name?: string; email?: string; phone?: string; } = {};

      if (!values.name) {
        errors.name = 'Name is requiered';
      } else if (values.name.trim().length < 2) {
        errors.name = 'Name must be atleast two characters long';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Not a valid email';
      }

      if (!values.phone) {
        errors.phone = 'Phone number is required';
      } else if (!/^\d+$/.test(values.phone)) {
        errors.phone = 'Phone number must contain only digits';
      } else if (values.phone.length < 5) {
        errors.phone = 'Phone number must be at least five digits';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const updatedSeatingData: SeatingArray = selectedMovie.seatingData.map((row) =>
        row.map((seat) => {
          if (selectedSeats.some((selectedSeat) => String(selectedSeat.id) === String(seat.id))) {
            seat.status = String('booked');
          }
          return seat;
        })
      );

      const updatedMovie: Movie = {
        ...selectedMovie,
        seatingData: updatedSeatingData,
      };

      const bookingDetails = {
        id: generateGUID(),
        movieId: selectedMovie.id,
        movieTitle: selectedMovie.title,
        seats: selectedSeats,
        ...values,
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
        console.error(error);
      }
    },
  });

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

      <form className="booking-form" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? (
            <div className='error'>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="string"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <div className='error'>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone ? (
            <div className='error'>{formik.errors.phone}</div>
          ) : null}
        </div>
        <button className="cancel-button" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button type='submit' className="confirm-button">
          Confirm Booking
        </button>
        <p>If the booking is successful you will be redirected to the start page.</p>
      </form>
    </div>
  );
}

export default BookTickets;
