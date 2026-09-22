import type {
  Dispatch,
  SetStateAction,
} from "react";

import {
  ArrowDownUp,
  Sparkles,
  IndianRupee,
  Star,
  Clock3,
  Timer,
  Grid2X2,
  List,
} from "lucide-react";

import "./SortBar.css";

export type SortOption =
  | "recommended"
  | "lowest-price"
  | "highest-rating"
  | "departure"
  | "arrival"
  | "duration";

export type ViewMode = "list" | "grid";

interface SortBarProps {
  selectedSort: SortOption;
  setSelectedSort: Dispatch<
    SetStateAction<SortOption>
  >;

  resultCount: number;

  viewMode: ViewMode;
  setViewMode: Dispatch<
    SetStateAction<ViewMode>
  >;
}

const SortBar = ({
  selectedSort,
  setSelectedSort,
  resultCount,
  viewMode,
  setViewMode,
}: SortBarProps) => {
  const sortOptions = [
    {
      value: "recommended" as SortOption,
      label: "Recommended",
      icon: Sparkles,
    },
    {
      value: "lowest-price" as SortOption,
      label: "Lowest Price",
      icon: IndianRupee,
    },
    {
      value: "highest-rating" as SortOption,
      label: "Top Rated",
      icon: Star,
    },
    {
      value: "departure" as SortOption,
      label: "Departure",
      icon: Clock3,
    },
    {
      value: "arrival" as SortOption,
      label: "Arrival",
      icon: Clock3,
    },
    {
      value: "duration" as SortOption,
      label: "Duration",
      icon: Timer,
    },
  ];

  return (
    <div className="sort-bar">

      <div className="sort-left">
        <div className="sort-heading">

          <div className="sort-heading-icon">
            <ArrowDownUp size={17} />
          </div>

          <div>
            <h2>Available Buses</h2>

            <span>
              {resultCount}{" "}
              {resultCount === 1
                ? "bus"
                : "buses"}{" "}
              found
            </span>
          </div>

        </div>
      </div>

      <div className="sort-right">

        <span className="sort-label">
          Sort by
        </span>

        <div className="sort-options">

          {sortOptions.map(
            ({ value, label, icon: Icon }) => (
              <button
                type="button"
                key={value}
                className={
                  selectedSort === value
                    ? "sort-option active"
                    : "sort-option"
                }
                onClick={() =>
                  setSelectedSort(value)
                }
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            )
          )}

        </div>

        <div className="view-toggle">

          <button
            type="button"
            className={
              viewMode === "list"
                ? "view-button active"
                : "view-button"
            }
            aria-label="List view"
            onClick={() =>
              setViewMode("list")
            }
          >
            <List size={17} />
          </button>

          <button
            type="button"
            className={
              viewMode === "grid"
                ? "view-button active"
                : "view-button"
            }
            aria-label="Grid view"
            onClick={() =>
              setViewMode("grid")
            }
          >
            <Grid2X2 size={15} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default SortBar;