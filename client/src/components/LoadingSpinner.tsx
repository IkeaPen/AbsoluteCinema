import { LuLoaderCircle } from "react-icons/lu";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <LuLoaderCircle className="animate-spin size-10" />
    </div>
  );
}
