import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTERS } from "../utils/enums";
import { setFilter } from "../store/filterSlice";

export default function FilterButtons() {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.filter);

  const handleActiveFilterChange = (newActiveFilter) => {
    dispatch(setFilter(newActiveFilter));
  };

  return (
    <div className="flex gap-2 justify-center items-center w-fit">
      <button
        className={`defaultButton ${
          activeFilter === FILTERS.ALL && "!bg-neutral-600"
        }`}
        onClick={() => handleActiveFilterChange(FILTERS.ALL)}
      >
        All
      </button>
      <button
        className={`defaultButton ${
          activeFilter === FILTERS.ACTIVE && "!bg-neutral-600"
        }`}
        onClick={() => handleActiveFilterChange(FILTERS.ACTIVE)}
      >
        Active
      </button>
      <button
        className={`defaultButton ${
          activeFilter === FILTERS.COMPLETED && "!bg-neutral-600"
        }`}
        onClick={() => handleActiveFilterChange(FILTERS.COMPLETED)}
      >
        Completed
      </button>
    </div>
  );
}
