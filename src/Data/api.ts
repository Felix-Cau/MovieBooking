import axios from 'axios';

const URL: string = "http://localhost:3000";

// function setReturnBooleanStatus(response) {
//     if (response === 200) {
//         const okStatus: boolean = true;
//         return okStatus;
//       } else {
//         const okStatus: boolean = false;
//         return okStatus;
//       }
// }

async function getMovies() {
  const response = await axios.get(`${URL}/movies`);

  if (response.status === 200) {
    return response.data;
  } else {
    return 'Data not found';
  }
}

async function createMovie(movie) {
    const response = await axios.post(`${URL}/movies`, movie);

    if (response.status === 200) {
        const okStatus: boolean = true;
        return okStatus;
      } else {
        const okStatus: boolean = false;
        return okStatus;
      }
}

async function updateMovie(movie) {
    const response = await axios.put(`${URL}/movies`, movie);

    if (response.status === 200) {
        const okStatus: boolean = true;
        return okStatus;
      } else {
        const okStatus: boolean = false;
        return okStatus;
      }
}

async function getSeatingData() {
    const response = await axios.get(`${URL}/seatingData`);

    if (response.status === 200) {
        return response.data;
    } else {
        return 'Data not found';
    }
}

async function createBooking(booking) {
  const response = await axios.post(`${URL}/bookings`, booking);

  if (response.status === 200) {
    const okStatus: boolean = true;
    return okStatus;
  } else {
    const okStatus: boolean = false;
    return okStatus;
  }
}

export { getMovies, createMovie, updateMovie, getSeatingData, createBooking };