import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/axios";
import { MovieCreateSchema, type MovieCreateDTO } from "../schemas/DbSchema";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AddMoviePage() {
  const navigate = useNavigate();
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [movieId, setMovieId] = useState<number>();

  const { register, handleSubmit, formState: { errors }} = useForm<MovieCreateDTO>({
    resolver: zodResolver(MovieCreateSchema),
  });

  const onSubmit = async (data: MovieCreateDTO) => {
    setShowModal(true);
    setSaving(true);
    setSaveError("");

    const payload = {
      ...data,
      releaseDate: new Date(data.releaseDate).toISOString(),
    };

    try {
      const res = await api.post("/movies", payload);
      setMovieId(res.data.id);
      //navigate(`/movies/${res.data.id}/screenings/by-date`);
    } catch {
      console.log("Failed to create movie.");
      setSaveError("Failed to create movie.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Add Movie</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-semibold">Title</label>
          <input {...register("title")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600"/>
          {errors.title && <p className="text-red-700 mt-1">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Studio</label>
          <input {...register("studio")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600"/>
          {errors.studio && <p className="text-red-700 mt-1">{errors.studio.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Release Date</label>
          <input type="date" {...register("releaseDate")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600 scheme-dark cursor-text" />
          {errors.releaseDate && (
            <p className="text-red-700 mt-1">{errors.releaseDate.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Image URL (optional)</label>
          <input type="url" {...register("imageUrl")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600"/>
          {errors.imageUrl && (
            <p className="text-red-700 mt-1">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Description (optional)</label>
          <textarea {...register("description")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600 h-32 resize-none"/>
        </div>

        {saveError && <p className="text-red-700 mt-1">{saveError}</p>}

        <button type="submit" disabled={saving || Boolean(saveError)} className="bg-teal-900 hover:bg-teal-800 cursor-pointer px-5 py-2 rounded-lg mt-2 disabled:opacity-50">
          Add Movie
        </button>
      </form>

      <Modal open={showModal} onClose={() => !saveError ? navigate(`/movies/${movieId}/screenings/by-date`) : setShowModal(false)}>
        {saving ?
          <LoadingSpinner />
        :
          !saveError ?
          <>
            <h2 className="text-xl font-bold text-green-700">Movie created</h2>
            <p className="text-neutral-300 mt-2">
              The movie has been successfully created.
            </p>
          </>
        :
          <>
            <h2 className="text-xl font-bold text-red-900">Creation failed</h2>
            <p className="text-neutral-300 mt-2">
              Could not create movie.
            </p>
          </>
        }
      </Modal>
    </div>
  );
}
