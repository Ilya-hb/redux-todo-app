import { setFilter } from "../store/filterSlice";
import { Filters } from "../types/enums";
import { useAppDispatch, useAppSelector } from "../utils/redux-hooks";

export default function FilterButtons() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.filter);

  const handleActiveFilterChange = (newActiveFilter: Filters) => {
    dispatch(setFilter(newActiveFilter));
  };

  return (
    <div className="flex gap-2 justify-center items-center w-fit">
      <button
        className={`defaultButton ${
          activeFilter === Filters.ALL && "!bg-neutral-600"
        }`}
        onClick={() => handleActiveFilterChange(Filters.ALL)}
      >
        All
      </button>
      <button
        className={`defaultButton ${
          activeFilter === Filters.ACTIVE && "!bg-neutral-600"
        }`}
        onClick={() => handleActiveFilterChange(Filters.ACTIVE)}
      >
        Active
      </button>
      <button
        className={`defaultButton ${
          activeFilter === Filters.COMPLETED && "!bg-neutral-600"
        }`}
        onClick={() => handleActiveFilterChange(Filters.COMPLETED)}
      >
        Completed
      </button>
    </div>
  );
}
