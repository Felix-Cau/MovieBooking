import axios from 'axios';
import { BookingDetails, Movie, SeatingArray } from '../ts/interfaces';

const URL: string = "http://localhost:3000";


async function getMovies() {
  const response = await axios.get<Movie[]>(`${URL}/movies`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

async function createMovie(movie: Movie) {
    const url = `${URL}/movies`;
    const response = await axios.post<Movie>(url, movie);

    if (response.status === 200) {
        const okStatus: boolean = true;
        return okStatus;
      } else {
        const okStatus: boolean = false;
        return okStatus;
      }
}

async function updateMovie(movie: Movie) {
    const url = `${URL}/movies/${movie.id}`
    const response = await axios.put<Movie>(url, movie);

    if (response.status === 200) {
        const okStatus: boolean = true;
        return okStatus;
      } else {
        console.log(response.status);
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
  const url = `${URL}/bookings`;
  const response = await axios.post<BookingDetails>(url, booking);

  if (response.status === 200) {
    const okStatus: boolean = true;
    return okStatus;
  } else {
    const okStatus: boolean = false;
    return okStatus;
  }
}

async function deleteMovie(movieId: string) {
  const url = `${URL}/movies/${movieId}`;
  const response = await axios.delete(url);

  if (response.status === 200) {
    const okStatus: boolean = true;
    return okStatus
  } else {
    const okStatus: boolean = false;
    return okStatus;
  }
}

export { getMovies, createMovie, updateMovie, getSeatingData, createBooking, deleteMovie };