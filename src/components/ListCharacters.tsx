"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import CardCharacter, { TMappedCharacter } from "./CardCharacter";
import { useQueryState } from "nuqs";
import { NoResultsFound } from "./api-states/NoResultsFound";
import { Spinner } from "./Spinner";
import FavoriteCharacter from "./FavoriteCharacter";

type TPageData = {
  offset: number;
  limit: number;
  page: number;
};

type TListCharactersProps = {
  items: Array<TMappedCharacter>;
  pageSize?: number;
  debounceTimeout?: number;
};

const ListCharacters = (props: TListCharactersProps) => {
  const { items = [], pageSize = 10, debounceTimeout = 1000 } = props;
  const uid = useId();
  const { ref, inView } = useInView();
  const [searchValue] = useQueryState("search", { defaultValue: "" });

  const [hasContentLoading, setHasContentLoading] = useState(false);
  const [currentPageData, setCurrentPageData] = useState<TPageData>({
    limit: pageSize,
    offset: 0,
    page: 1,
  });
  const [internalItems, setInternalItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<TMappedCharacter[]>([]);

  const hasNextPage = internalItems.length < items.length;
  const filteredItems = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(searchValue)),
    [searchValue, items]
  );
  const mappedItems = searchValue ? filteredItems : internalItems;

  useEffect(() => {
    if (internalItems.length === 0) setInternalItems(items.slice(0, pageSize));
  }, [internalItems.length, items, pageSize]);

  useEffect(() => {
    if (!searchValue && inView) {
      if (hasNextPage) {
        setHasContentLoading(true);
        const newPage = {
          offset: currentPageData.page * currentPageData.limit,
          page: currentPageData.page + 1,
          limit: currentPageData.limit,
        };
        const nextOptions = items.slice(
          newPage.offset,
          newPage.offset + newPage.limit
        );
        setTimeout(() => {
          setCurrentPageData(newPage);
          setInternalItems((prev) => [...prev, ...nextOptions]);
          setHasContentLoading(false);
        }, debounceTimeout);
      }
    }
  }, [
    searchValue,
    inView,
    currentPageData.limit,
    currentPageData.page,
    hasNextPage,
    debounceTimeout,
    items,
  ]);

  useEffect(() => {
    const loadFavorites = () => {
      const favoritedCharacters: TMappedCharacter[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("favorite-")) {
          const characterData = localStorage.getItem(key);
          if (characterData) {
            favoritedCharacters.push(JSON.parse(characterData));
          }
        }
      }
      setFavorites(favoritedCharacters);
    };

    loadFavorites();
  }, []);

  const handleFavoriteToggle = (character: TMappedCharacter) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.id === character.id);
      if (isFavorited) {
        return prevFavorites.filter((fav) => fav.id !== character.id);
      } else {
        return [...prevFavorites, character];
      }
    });
  };

  if (!mappedItems.length) return <NoResultsFound />;

  return (
    <div>
      <div className="sticky top-0 mb-4 p-4 bg-slate-800 rounded z-50">
        <h2 className="text-xl font-bold mb-2 text-white">
          Favorited Characters
        </h2>
        <FavoriteCharacter />
      </div>
      <div className="flex flex-wrap justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mappedItems?.map((item, index) => (
          <Link
            key={uid + item.name + index}
            href={`/characters/${item.id}`}
            prefetch
            scroll={false}
          >
            <CardCharacter
              data={item}
              onFavoriteToggle={handleFavoriteToggle}
            />
          </Link>
        ))}

        {!!searchValue || (
          <div
            ref={ref}
            className="h-auto bg-white-800 border rounded-md flex items-center justify-center"
          >
            {hasContentLoading ? (
              <Spinner />
            ) : hasNextPage ? (
              "Load More..."
            ) : (
              "You have viewed all items!"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCharacters;
