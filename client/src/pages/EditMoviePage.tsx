import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import { MovieUpdateSchema, type MovieUpdateDTO } from "../schemas/DbSchema";

export default function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MovieUpdateDTO>({
    resolver: zodResolver(MovieUpdateSchema),
  });

  async function fetchMovie() {
    setLoading(true);
    try {
      const res = await api.get(`/movies/${id}`);
      const movie = res.data;

      reset({
        id: movie.id,
        title: movie.title,
        studio: movie.studio,
        releaseDate: movie.releaseDate.split("T")[0],
        imageUrl: movie.imageUrl ?? "",
        description: movie.description ?? "",
      });
    } catch {
      console.log("Movie not found.");
      setLoadError("Movie not found.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  const onSubmit = async (data: MovieUpdateDTO) => {
    setSaveError("");
    setShowModal(true);
    setSaving(true);

    const payload = {
      ...data,
      releaseDate: new Date(data.releaseDate).toISOString(),
    };

    try {
      await api.put(`/movies/${data.id}`, payload);  
    } catch {
      console.log("Failed to update movie.");
      setSaveError("Failed to update movie.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (loadError) return <p className="text-red-400 text-center">{loadError}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Movie</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-semibold">Title</label>
          <input {...register("title")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600"/>
          {errors.title && (
            <p className="text-red-700 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Studio</label>
          <input {...register("studio")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600"/>
          {errors.studio && (
            <p className="text-red-700 mt-1">{errors.studio.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Release Date</label>
          <input type="date" {...register("releaseDate")} className="p-2 rounded-lg bg-neutral-800 border border-neutral-600 scheme-dark cursor-text"/>
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

        <button type="submit" disabled={saving || Boolean(saveError)} className="bg-teal-900 hover:bg-teal-800 cursor-pointer px-5 py-2 rounded-lg mt-2 disabled:cursor-not-allowed disabled:opacity-50">
          Save Changes
        </button>
      </form>

      <Modal open={showModal} onClose={() => !saveError ? navigate(`/movies/${id}/screenings/by-date`) : setShowModal(false)}>
        {saving ?
          <LoadingSpinner />
        :
          !saveError ?
          <>
            <h2 className="text-xl font-bold text-green-700">Changes saved</h2>
            <p className="text-neutral-300 mt-2">
              The movie has been successfully updated.
            </p>
          </>
        :
          <>
            <h2 className="text-xl font-bold text-red-900">Changes failed</h2>
            <p className="text-neutral-300 mt-2">
              Could not save changes.
            </p>
          </>
        }
      </Modal>

      
    </div>
  );
}
