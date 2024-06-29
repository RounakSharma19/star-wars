"use client";

import { type ElementRef, useEffect, useRef, useId } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const uid = useId();
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      document.body.style.overflowY = "hidden";
    }
  }, []);

  const onDismiss = () => {
    document.body.style.overflowY = "auto";
    router.back();
  };

  return createPortal(
    <div className="fixed inset-0 h-dvh z-50 flex items-center justify-center bg-slate-800/70">
      <dialog
        key={uid}
        ref={dialogRef}
        className="relative h-fit overflow-hidden bg-slate-800 text-slate-50 rounded sm-scrollbar"
        onClose={onDismiss}
      >
        {children}
        <button
          onClick={onDismiss}
          className="absolute top-1 right-1 z-50 w-8 h-8 flex items-center justify-center rounded-full"
        >
          <XIcon />
        </button>
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
};
