import Link from "next/link";
import { MillenniumFalcon } from "../icons/MillenniumFalcon";

export const NoResultsFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6 w-full p-4 text-center bg-slate-900 text-slate-100">
      <div className="animate-bounce">
        <MillenniumFalcon />
      </div>
      <p className="text-lg font-semibold">
        It looks like your hero is lost in a distant galaxy...
      </p>
      <p className="text-md text-slate-400">
        Don't worry, you can search for another hero to join your journey.
      </p>
      <Link href="/" className="underline text-amber-400 font-semibold">
        Search Again
      </Link>
    </div>
  );
};

export default NoResultsFound;
