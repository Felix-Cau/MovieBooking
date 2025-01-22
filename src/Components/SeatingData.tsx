import { SeatingDataProps, Seat } from '../ts/interfaces';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeatingData({ movie }: SeatingDataProps): JSX.Element {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const selectedMovie = movie;
    const navigate = useNavigate();

    const selectedCount = selectedSeats.length;
    const totalPrice = selectedCount * selectedMovie.price;

    function changeSeatSelection(seat: Seat) {
        setSelectedSeats((prevSelectedSeats) => {
            const isSeatSelected = prevSelectedSeats.some((s) => s.id === seat.id);
            if (isSeatSelected) {
                return prevSelectedSeats.filter((s) => s.id !== seat.id);
            } else {
                return [...prevSelectedSeats, seat];
            }
        });
    }

    function handleBookTickets() {
        navigate('/book-tickets', {
            state: {
                selectedSeats,
                selectedMovie,
            },
        });
    }

    return (
        <div>
            <div className="container text-center">
                <h2>{movie.title}</h2>
                <p>Price per ticket: {movie.price} SEK</p>
                <div className='container'>
                    {movie.seatingData.map((row, rowIndex) => (
                        <div key={rowIndex} className="row ms-auto">
                            {row.map((seat) => (
                                <div
                                    key={seat.id}
                                    className={`seat ${seat.status === 'booked' ? 'occupied' : ''
                                        } ${selectedSeats.some((s) => s.id === seat.id) ? 'selected' : ''}`}
                                    data-seat-id={seat.id}
                                    data-status={seat.status}
                                    onClick={() => {
                                        if (seat.status !== 'booked') changeSeatSelection(seat);
                                    }}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <p className="text">
                You have selected <span id="count">{selectedCount}</span> seat(s) for a price of <span id="total">{totalPrice}</span> SEK.
            </p>
            <button onClick={handleBookTickets} className="book-button">
                Book Tickets
            </button>
        </div>
    );
}


export default SeatingData;