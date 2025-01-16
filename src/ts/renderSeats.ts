import { Seat, SeatingArray } from './inferfaces';

function rendingSeats(seatingArray: SeatingArray) {
    const container = document.createElement('div');
    container.classList.add('container');

    seatingArray.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        row.forEach((seat: Seat) => {
            const seatDiv = document.createElement('div');
            seatDiv.classList.add('seat');

            seatDiv.dataset.seatId = seat.id;
            seatDiv.dataset.status= seat.status;

            if (seat.status === 'booked') {
                seatDiv.classList.add('Occupied');
            } else if (seat.status === 'unavailable') {
                seatDiv.classList.add('N/A');
            } 

            rowDiv.appendChild(seatDiv);
        });
        container.appendChild(rowDiv);
    });
    document.appendChild(container);
}

export { rendingSeats };