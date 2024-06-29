"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import CardCharacter, { TMappedCharacter } from "./CardCharacter";
import { useQueryState } from "nuqs";
import { NoResultsFound } from "./api-states/NoResultsFound";
import { Spinner } from "./Spinner";

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

  if (!mappedItems.length) return <NoResultsFound />;

  return (
    <div className="list-characters px-6 pb-6">
      {mappedItems?.map((item, index) => (
        <Link
          key={uid + item.name + index}
          href={`/characters/${item.id}`}
          prefetch
          scroll={false}
        >
          <CardCharacter data={item} />
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
  );
};

export default ListCharacters;
