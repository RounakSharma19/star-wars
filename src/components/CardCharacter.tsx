import React, { useEffect, useState } from "react";
import { TCharacter } from "@/types";
import NextImage from "./NextImage";
import {
  EarthIcon,
  ArrowUpRightIcon,
  StarIcon,
  StarOffIcon,
} from "lucide-react";
import { createBackgroundString } from "@/utils";

export type TMappedCharacter = TCharacter & {
  id: string | undefined;
  homeworldName: string | undefined;
  skin_colors: string | undefined;
};

type TCardCharacterProps = { data: TMappedCharacter };

const CardCharacter = (props: TCardCharacterProps) => {
  const { data } = props;

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favoriteStatus = localStorage.getItem(`favorite-${data.id}`);
    if (favoriteStatus === "true") {
      setIsFavorited(true);
    }
  }, [data.id]);

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorited;
    setIsFavorited(newFavoriteStatus);
    localStorage.setItem(`favorite-${data.id}`, newFavoriteStatus.toString());
  };

  return (
    <div className="group relative rounded-md overflow-hidden cursor-pointer p-[1px] hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300">
      <div className="bg-slate-800 rounded p-2 group-hover:bg-opacity-65">
        <NextImage
          unoptimized
          src={`${process.env.NEXT_PUBLIC_IMG_URL}/characters/${data.id}.jpg`}
          height={0}
          width={200}
          className="object-cover w-full h-auto rounded"
        />
        <div className="pt-2">
          <div className="flex items-center group-hover:text-amber-400 gap-1">
            <h3 className="text-lg font-[600] leading-[1.2]">{data.name}</h3>
            <ArrowUpRightIcon className="ml-auto h-5 shrink-0 invisible group-hover:visible" />
            <button onClick={toggleFavorite} className="ml-2">
              {isFavorited ? (
                <StarIcon className="h-5 text-yellow-400" />
              ) : (
                <StarOffIcon className="h-5 text-gray-400" />
              )}
            </button>
          </div>
          <div className="flex items-center text-slate-300 group-hover:text-amber-200">
            <EarthIcon className="h-4" />
            <span>{data.homeworldName}</span>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background: createBackgroundString({
            colors: data.skin_colors || "gray, gray",
          }),
        }}
      />
    </div>
  );
};

export default CardCharacter;
