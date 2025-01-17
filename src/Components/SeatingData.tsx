import { Seat, SeatingDataProps } from '../ts/inferfaces';

function SeatingData({ seatingArray }: SeatingDataProps): JSX.Element {
    return (
      <div className="container">
        {seatingArray.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat: Seat) => (
              <div
                key={seat.id}
                className={`seat ${seat.status === 'booked' ? 'occupied' : ''} ${
                  seat.status === 'available' ? 'seat' : ''
                }`}
                data-seat-id={seat.id}
                data-status={seat.status}
                >
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  export default SeatingData;