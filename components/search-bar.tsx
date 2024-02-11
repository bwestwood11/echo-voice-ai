"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch(`/api/searchAudioFiles?query=${query}`);
  };
  return (
    <div className="xl:w-1/4 w-1/2 mt-4" >
      <form className="flex space-x-2 items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <Button variant="orange" size="lg">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
