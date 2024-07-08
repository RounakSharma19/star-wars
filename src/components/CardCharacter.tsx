"use client";

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

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteStatus = !isFavorited;
    setIsFavorited(newFavoriteStatus);
    localStorage.setItem(`favorite-${data.id}`, newFavoriteStatus.toString());
  };

  return (
    <div className="group relative rounded-md overflow-hidden cursor-pointer p-[1px] hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300 w-[200px] h-[300px]">
      <div className="bg-slate-800 rounded p-2 group-hover:bg-opacity-65 h-full flex flex-col">
        <div className="w-full h-[180px] overflow-hidden rounded">
          <NextImage
            unoptimized
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/characters/${data.id}.jpg`}
            height={180}
            width={180}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="pt-2 flex-grow flex flex-col justify-between">
          <div className="flex items-start group-hover:text-amber-400">
            <h3 className="text-sm sm:text-base font-[600] leading-tight line-clamp-2">
              {data.name}
            </h3>
            <ArrowUpRightIcon className="ml-auto h-4 sm:h-5 shrink-0 invisible group-hover:visible mt-0.5" />
          </div>
          <div className="flex items-center justify-between text-slate-300 group-hover:text-amber-200 mt-2">
            <div className="flex items-center">
              <EarthIcon className="h-3 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm truncate max-w-[120px]">
                {data.homeworldName}
              </span>
            </div>
            <button onClick={toggleFavorite} className="ml-2">
              {isFavorited ? (
                <StarIcon className="h-4 sm:h-5 text-yellow-400" />
              ) : (
                <StarOffIcon className="h-4 sm:h-5 text-gray-400" />
              )}
            </button>
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
