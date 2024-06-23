import React from "react";
import { FaAngleDown } from "react-icons/fa";

interface HeaderCellProps {
  children: React.ReactNode;
}

const SortingCell: React.FC<HeaderCellProps> = ({ children }) => {
  return (
    <th>
      <div className="flex cursor-pointer items-center justify-center py-3 pl-2">
        {children} <FaAngleDown className="ml-1 text-sm opacity-50" />
      </div>
    </th>
  );
};

export default SortingCell;
