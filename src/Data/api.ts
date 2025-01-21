import axios from 'axios';
import { BookingDetails, Movie, SeatingArray } from '../ts/interfaces';

const URL: string = "http://localhost:3000";


async function getMovies() {
  const response = await axios.get<Movie[]>(`${URL}/movies`);

  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

async function createMovie(movie: Movie) {
    const URI = `${URL}/movies`;
    const response = await axios.post<Movie>(URI, movie);

    if (response.status === 201) {
        const okStatus: boolean = true;
        return okStatus;
      } else {
        const okStatus: boolean = false;
        return okStatus;
      }
}

async function updateMovie(movie: Movie) {
    const URI = `${URL}/movies/${movie.id}`
    const response = await axios.put<Movie>(URI, movie);

    if (response.status === 200) {
        const okStatus: boolean = true;
        return okStatus;
      } else {
        const okStatus: boolean = false;
        return okStatus;
      }
}

async function getSeatingData() {
    const response = await axios.get<SeatingArray>(`${URL}/seatingData`);

    if (response.status === 200) {
        return response.data;
    } else {
        return;
    }
}

async function createBooking(booking: BookingDetails) {
  const URI = `${URL}/bookings`;
  const response = await axios.post<BookingDetails>(URI, booking);

  if (response.status === 201) {
    const okStatus: boolean = true;
    return okStatus;
  } else {
    const okStatus: boolean = false;
    return okStatus;
  }
}

async function getAllBookings() {
  const response = await axios.get<BookingDetails[]>(`${URL}/bookings`);
  
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
}

async function deleteBooking(bookingId: string) {
  const URI = `${URL}/bookings/${bookingId}`;
  const response = await axios.delete(URI);

  if (response.status === 200) {
    const okStatus: boolean = true;
    return okStatus
  } else {
    const okStatus: boolean = false;
    return okStatus;
  }
}

async function deleteMovie(movieId: string) {
  const URI = `${URL}/movies/${movieId}`;
  const response = await axios.delete(URI);

  if (response.status === 200) {
    const okStatus: boolean = true;
    return okStatus
  } else {
    const okStatus: boolean = false;
    return okStatus;
  }
}

export { getMovies, createMovie, updateMovie, getSeatingData, createBooking, deleteMovie, deleteBooking, getAllBookings };