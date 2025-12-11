import type { Seat } from "../schemas/DbSchema";

interface Props {
  seats: Seat[],
  chosenSeat: Seat | undefined,
  setChosenSeat: React.Dispatch<React.SetStateAction<Seat | undefined>>
}

export default function SeatSelector({ seats, chosenSeat, setChosenSeat }: Props) {
  function countColSize(): number {
    const rowNumber = seats[0].row;
    let count = 0;
    for (const seat of seats) {
      if (seat.row === rowNumber) count++;
      else {
        return count;
      } 
    }
    return 10;
  }

  return (
    <div style={{ gridTemplateColumns: `repeat(${countColSize()}, minmax(50px, 1fr))` }} className={`grid gap-2 bg-neutral-900 p-4 rounded-xl max-w-180`}>
      {seats?.map(seat => (
        <button onClick={() => seat.id === chosenSeat?.id ? setChosenSeat(undefined) : setChosenSeat(seat)} key={seat.id} disabled={seat.isBooked} 
          className={ `p-2 rounded text-center ` + (seat.isBooked ? "bg-gray-600/80 cursor-not-allowed" : (seat.id === chosenSeat?.id ? "bg-green-950/80 cursor-pointer" : "bg-green-700 hover:bg-green-800 cursor-pointer"))}>
          
          {seat.row}-{seat.number}
        </button>
      ))}
    </div>
  );
}
