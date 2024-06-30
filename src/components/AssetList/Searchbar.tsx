import React from "react";

import { FaSearch } from "react-icons/fa";

interface SearchbarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onChange }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <FaSearch className="mx-2 h-5 w-5 text-neutral-500" />
      <input
        className="w-full rounded-lg p-2 text-neutral-500"
        type="text"
        placeholder="Search for assets"
        onChange={onChange}
      />
    </div>
  );
};

export default Searchbar;
