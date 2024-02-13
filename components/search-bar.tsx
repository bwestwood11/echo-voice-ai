"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
  const [isTyping, setIsTyping] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    console.log(value);
    setIsTyping(value.trim() !== ""); // Check if the input value is not empty after trimming
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="xl:w-1/4 sm:w-1/2 mt-4 relative flex flex-1 flex-shrink-0">
      <input
        type="text"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      {!isTyping && (
        <FaMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      )}
    </div>
  );
};

export default SearchBar;
