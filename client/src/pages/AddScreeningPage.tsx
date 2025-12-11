import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { api } from "../api/axios";
import { ScreeningCreateSchema, type CinemaHall, type ScreeningCreateDTO } from "../schemas/DbSchema";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AddScreeningPage() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [halls, setHalls] = useState<CinemaHall[]>([]);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ScreeningCreateDTO>({
    resolver: zodResolver(ScreeningCreateSchema),
    defaultValues: {
      movieId: Number(movieId),
    },
  });

  async function fetchCinemaHalls(){
    setLoading(true);
    try {
      const res = await api.get(`/cinema-halls`);
      setHalls(res.data);
      console.log("Halls:", res.data);
    } catch (err) {
      console.log("Could not fetch halls:", err);
      setSaveError("Failed to load cinema halls.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCinemaHalls();
  }, []);

  const onSubmit = async (data: ScreeningCreateDTO) => {
    setShowModal(true);
    setSaving(true);
    setSaveError("");

    const localDate = data.date;
    const [datePart, timePart] = localDate.split("T"); 
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);

    const utcEquivalent = new Date(Date.UTC(year, month - 1, day, hour, minute));

    const payload = {
      ...data,
      movieId: Number(movieId),
      priceRatio: isNaN(data.priceRatio as number) ? undefined : data.priceRatio,
      date: utcEquivalent.toISOString()
    };

    try {
      await api.post("/screenings", payload);
      //navigate(`/screenings/${res.data.id}`);
    } catch {
      console.log("Failed to create screening.");
      setSaveError("Failed to create screening.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Add Screening</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="flex flex-col">
          <label className="font-semibold">Date & Start Time</label>
          <input type="datetime-local" {...register("date")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600 scheme-dark cursor-text"/>
          {errors.date && (
            <p className="text-red-700">{errors.date.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Price Ratio (optional)</label>
          <input type="number" step="0.1" placeholder="1.0" {...register("priceRatio", { setValueAs: v => (v === "" ? undefined : Number(v)) })} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600"/>
          {errors.priceRatio && (
            <p className="text-red-700">{errors.priceRatio.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Cinema Hall</label>
          <select {...register("cinemaHallId", { valueAsNumber: true })} defaultValue={0} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600">
            <option value={0}>Select hall</option>
            {halls.map((hall) => (
              <option key={hall.id} value={hall.id}>
                {hall.name}
              </option>
            ))}
          </select>
          {errors.cinemaHallId && (
            <p className="text-red-700">{errors.cinemaHallId.message}</p>
          )}
        </div>

        {saveError && <p className="text-red-700">{saveError}</p>}

        <button type="submit" disabled={saving || Boolean(saveError)} className="bg-teal-900 hover:bg-teal-800 cursor-pointer px-5 py-2 rounded-lg mt-2 disabled:opacity-50">
          Add Screening
        </button>
      </form>

      <Modal open={showModal} onClose={() => !saveError ? navigate(`/movies/${movieId}/screenings/by-date`) : setShowModal(false)}>
        {saving ?
          <LoadingSpinner />
        :
          !saveError ?
          <>
            <h2 className="text-xl font-bold text-green-700">Screening created</h2>
            <p className="text-neutral-300 mt-2">
              The screening has been successfully created.
            </p>
          </>
        :
          <>
            <h2 className="text-xl font-bold text-red-900">Creation failed</h2>
            <p className="text-neutral-300 mt-2">
              Could not create screenings.
            </p>
          </>
        }
      </Modal>
    </div>
  );
}
