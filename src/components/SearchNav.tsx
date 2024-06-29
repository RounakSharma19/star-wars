"use client";

import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import React, { useState } from "react";
import { TClassValue, cn } from "@/utils/common";
import { useDebounce } from "@/hooks";

type TSearchNavProps = { placeholder?: string; className?: TClassValue };

const SearchNav = (props: TSearchNavProps) => {
  const { placeholder, className } = props;
  const [searchValue, setSearchValue] = useQueryState("search", {
    defaultValue: "",
  });

  const [inputValue, setInputValue] = useState(searchValue);
  const debouncedValue = useDebounce(inputValue, 1000);

  React.useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue, setSearchValue]);

  const handleSearch = (term: string) => {
    setInputValue(term.toLowerCase());
  };

  return (
    <div className={cn("relative flex flex-1 flex-shrink-0", className)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded border bg-transparent border-red-500 py-[9px] pl-10 text-sm outline-none placeholder:text-red-500 text-black" // Added text-black class here
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        value={inputValue}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-red-500 peer-focus:text-red-300" />
    </div>
  );
};

export default SearchNav;
