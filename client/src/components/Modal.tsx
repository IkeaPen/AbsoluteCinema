import { type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-xl shadow-xl max-w-md w-full text-center">
        
        {children}

        <button onClick={onClose} className="mt-6 px-5 py-2 rounded-lg cursor-pointer bg-green-800/80 hover:bg-green-800/60">
          OK
        </button>
      </div>
    </div>
  );
}
