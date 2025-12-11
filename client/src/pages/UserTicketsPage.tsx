import { useState, useEffect } from "react";
import { api } from "../api/axios";
import type { Ticket } from "../schemas/DbSchema";
import LoadingSpinner from "../components/LoadingSpinner";

export default function UserTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTickets() {
    setLoading(true);
    try {
      const response = await api.get("/tickets/me");
      setTickets(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (tickets.length === 0) return <p className="text-center mt-10">You have no tickets yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>

      <div className="grid gap-4">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-neutral-900 max-w-200 min-w-80 p-4 rounded-xl shadow-md flex flex-col sm:flex-row justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {ticket.screening.movie.title}
              </h2>

              <p className="opacity-70">
                Cinema hall: {ticket.screening.cinemaHall.name}
              </p>

              <p className="opacity-70">
                Seat: Row {ticket.seat.row}, Number {ticket.seat.number}
              </p>

              <p className="mt-2">
                Screening date:{" "}
                {ticket.screening.date.slice(0, 10)}{" "}
                {ticket.screening.date.slice(11, 16)}
              </p>

              <p className="opacity-70">
                Purchased:{" "}
                {ticket.purchaseDate.slice(0, 10)}{" "}
                {ticket.purchaseDate.slice(11, 16)}
              </p>
            </div>

            <div className="text-right mt-4 sm:mt-0">
              <p className="text-lg font-bold">${ticket.finalPrice.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
