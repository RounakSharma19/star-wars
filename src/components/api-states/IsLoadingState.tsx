import { R2D2 } from "../icons/R2D2";

export const IsLoadingState = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6 w-full p-4 text-center bg-slate-900 text-slate-100">
      <div className="animate-spin-slow">
        <R2D2 />
      </div>
      <p className="text-lg font-semibold">
        Loading... Please hold on as we transport you to a galaxy far, far
        away...
      </p>
    </div>
  );
};

export default IsLoadingState;
