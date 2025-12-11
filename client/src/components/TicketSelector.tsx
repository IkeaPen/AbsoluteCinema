import type { TicketType } from "../schemas/DbSchema";

interface Props {
  ticketTypes: TicketType[],
  chosenTicketType: TicketType | undefined,
  setChosenTicketType: React.Dispatch<React.SetStateAction<TicketType | undefined>>,
  priceRatio: number
}

export default function SeatSelector({ ticketTypes, chosenTicketType, setChosenTicketType, priceRatio }: Props) {
  return (
    <div className="space-y-3 mt-4">
      {ticketTypes.map((ticketType: TicketType) => (
        <button key={ticketType.id} onClick={() => ticketType.id === chosenTicketType?.id ? setChosenTicketType(undefined) : setChosenTicketType(ticketType)} className={`flex justify-between items-center w-full p-4 cursor-pointer rounded-xl border transition 
            ${chosenTicketType?.id === ticketType.id ? "border-teal-200 bg-teal-200/20 shadow-lg scale-[1.01]" : "border-neutral-700 hover:border-teal-200"}`}>
          <div className="text-left">
            <p className="text-lg font-semibold">{ticketType.description} <span className="text-gray-300/60">- {priceRatio*ticketType.price}€</span></p>
          </div>

          <span className={`px-4 py-1 text-lg transition-opacity duration-300 ${chosenTicketType?.id === ticketType.id ? "opacity-100" : "opacity-0"}`}>Selected</span>
        </button>
      ))}
    </div>
  );
};
