import { SeatingDataProps } from '../ts/inferfaces';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeatingData({ movie }: SeatingDataProps): JSX.Element {
    const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
    const selectedMovie = movie;

    const selectedCount = selectedSeats.size;
    const totalPrice = selectedCount * selectedMovie.price;

    function changeSeatSelection(seatId: string) {
        setSelectedSeats((prevSelectedSeats) => {
            const updatedSeats = new Set(prevSelectedSeats);
            if (updatedSeats.has(seatId)) {
                updatedSeats.delete(seatId);
            } else {
                updatedSeats.add(seatId);
            }
            return updatedSeats;
        });
    }
    
    const handleBookTickets = () => {
        const navigate = useNavigate();
        navigate('/book-tickets', {
        state: {
            selectedSeats: Array.from(selectedSeats),
            selectedMovie,
        },
        });
    }

return (
    <div>
        <div className="container">
        <h2>{movie.title}</h2>
        <p>Price per ticket: {movie.price} SEK</p>
        {movie.seatingData.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
            {row.map((seat) => (
                <div
                key={seat.id}
                className={`seat ${
                    seat.status === 'booked' ? 'occupied' : ''
                } ${selectedSeats.has(seat.id) ? 'selected' : ''}`}
                data-seat-id={seat.id}
                data-status={seat.status}
                onClick={() => {
                    if (seat.status !== 'booked') changeSeatSelection(seat.id);
                }}
                ></div>
            ))}
            </div>
        ))}
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