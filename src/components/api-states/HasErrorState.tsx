import Link from "next/link";
import { DeathStar } from "../icons/DeathStar";

const HasErrorState = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6 w-full p-4 text-center">
      <div className="w-16 h-16 text-amber-400">
        <DeathStar />
      </div>
      <p className="text-lg font-semibold text-slate-700">
        Oops! Something went wrong.
      </p>
      <p className="text-md text-slate-500">
        Don't worry, our team is on it. Please try again later or go back to the
        homepage.
      </p>
      <Link href="/" className="underline text-amber-400 font-semibold">
        Go Back Home
      </Link>
    </div>
  );
};

export default HasErrorState;
