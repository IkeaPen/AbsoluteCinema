import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { ScreeningWithExtras, Seat, TicketType } from "../schemas/DbSchema";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate, useParams } from "react-router";
import SeatSelector from "../components/SeatSelector";
import TicketSelector from "../components/TicketSelector";
import Modal from "../components/Modal";

export default function ScreeningRegisterPage() {
  const navigate = useNavigate();
  const { screeningId } = useParams();
  const [screening, setScreening] = useState<ScreeningWithExtras>();
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [chosenSeat, setChosenSeat] = useState<Seat>();
  const [chosenTicketType, setChosenTicketType] = useState<TicketType>();
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(true);
  const [purchaseStatus, setPurchaseStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const validPurchase = chosenTicketType && chosenSeat && screening;

  async function fetchScreening() {
    setLoading(true);
    try {
      const res = await api.get(`/screenings/${screeningId}`);
      setScreening(res.data);
      console.log("Screening:", res.data);
    } catch (err) {
      console.log("Could not fetch screening:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTicketTypes() {
    try {
      const res = await api.get(`/tickets/types`);
      setTicketTypes(res.data);
      console.log("Ticket Types:", res.data);
    } catch (err) {
      console.log("Could not fetch ticket types:", err);
    }
  }

  async function postTicket() {
    if(!chosenTicketType || !chosenSeat || !screening) return;

    setPurchaseLoading(true);
    setShowModal(true);
    try {
      await api.post(`screenings/${screening.id}/seats/${chosenSeat.id}/tickets`, {
        finalPrice: chosenTicketType.price * screening.priceRatio,
        ticketTypeId: chosenTicketType.id,
      });
      setPurchaseStatus(true);
      console.log("Ticket saved");
    } catch (err) {
      console.log("Could not post ticket:", err);
    } finally {
      setPurchaseLoading(false);
    }
  }

  useEffect(() => {
    fetchScreening();
    fetchTicketTypes();
  }, []);

  
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (!screening) {
    return (
      <p className="opacity-60">No screening found</p>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">

      <div className="flex gap-6">
        <img src={screening.movie.imageUrl ?? undefined} className="w-40 rounded" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{screening.movie.title}</h1>
          <p className="opacity-70">{screening.movie.studio}</p>
          <p className="opacity-70">{screening.movie.releaseDate.slice(0,10)}</p>
          <h2 className="text-2xl font-bold mt-6">Screening:</h2>
          <p className="text-lg">{screening.date.slice(0,10)}, {screening.date.slice(11,16)}h</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-2">
        {screening.cinemaHall.name} - <span className="text-xl text-gray-300/80"> (select seat)</span>
      </h2>

      <SeatSelector seats={screening.seats} chosenSeat={chosenSeat} setChosenSeat={setChosenSeat} />
      
      <h2 className="text-2xl font-semibold mt-12 mb-2">Select ticket type:</h2>
      <TicketSelector ticketTypes={ticketTypes} chosenTicketType={chosenTicketType} setChosenTicketType={setChosenTicketType} />

      
      <button onClick={() => postTicket()} disabled={!validPurchase} className={`mt-3 mb-2 px-4 py-2 rounded-lg ${validPurchase ? "bg-green-800/80 hover:bg-green-800/60 cursor-pointer" : "bg-gray-600/80 text-gray-400"}`}>
        Buy Ticket
      </button>
      {!validPurchase && <p className="pb-3 opacity-60">Chose seat and ticket type before buying</p>}

      <Modal open={showModal} onClose={() => purchaseStatus ? navigate(`/movies/${screening.movie.id}/screenings/by-date?date=${screening.date.slice(0,10)}`) : setShowModal(false)}>
        {purchaseLoading ?
          <LoadingSpinner />
        :
          purchaseStatus ?
          <>
            <h2 className="text-2xl font-bold text-green-700">Purchase successful</h2>
            <p className="text-neutral-300 mt-2">
              <span className="text-lg font-bold">{screening.movie.title}</span><br/>
              {screening.date.slice(0,10)}, {screening.date.slice(11,16)}h<br/>
              {screening.cinemaHall.name} - Row {chosenSeat?.row} - Seat {chosenSeat?.number}<br/>
            </p>
          </>
        :
          <>
            <h2 className="text-xl font-bold text-red-900">Purchase failed</h2>
            <p className="text-neutral-300 mt-2">
              Could not process ticket purchase
            </p>
          </>
        }
      </Modal>

    </div>
  );
}
