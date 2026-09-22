import { useMemo, useState } from "react";

import FilterSidebar, {
  type Filters,
} from "../../components/FilterSidebar/FilterSidebar";

import SortBar, {
  type SortOption,
  type ViewMode,
} from "../../components/SortBar/SortBar";

import BusCard from "../../components/BusCard/BusCard";

import { buses } from "../../data/buses";
import type { Bus } from "../../types/bus";

import "./SearchResults.css";

const DEFAULT_FILTERS: Filters = {
  minPrice: 300,
  maxPrice: 2500,
  departure: "All",
  busTypes: [],
  amenities: [],
  rating: 0,
};

const parseTimeToMinutes = (time: string): number => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);

  if (!match) {
    return 0;
  }

  let hour = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }

  return hour * 60 + minutes;
};

const parseDurationToMinutes = (duration: string): number => {
  const match = duration.match(/(\d+)h\s*(\d+)m?/i);

  if (!match) {
    return 0;
  }

  return Number(match[1]) * 60 + Number(match[2] || 0);
};

const SearchResults = () => {
  const [filters, setFilters] =
    useState<Filters>(DEFAULT_FILTERS);

  const [selectedSort, setSelectedSort] =
    useState<SortOption>("recommended");

  const [viewMode, setViewMode] =
    useState<ViewMode>("list");

  const handleBusSelect = (bus: Bus) => {
    console.log("Selected Bus:", bus);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const filteredBuses = useMemo(() => {
    let result = [...buses];

    result = result.filter(
      (bus) =>
        bus.price >= filters.minPrice &&
        bus.price <= filters.maxPrice
    );

    if (filters.departure !== "All") {
      result = result.filter((bus) => {
        const minutes = parseTimeToMinutes(bus.departure);

        if (filters.departure === "Morning") {
          return minutes >= 5 * 60 && minutes < 12 * 60;
        }

        if (filters.departure === "Afternoon") {
          return minutes >= 12 * 60 && minutes < 17 * 60;
        }

        if (filters.departure === "Evening") {
          return minutes >= 17 * 60 && minutes < 21 * 60;
        }

        if (filters.departure === "Night") {
          return minutes >= 21 * 60 || minutes < 5 * 60;
        }

        return true;
      });
    }

    if (filters.busTypes.length > 0) {
      result = result.filter((bus) =>
        filters.busTypes.includes(bus.type)
      );
    }

    if (filters.amenities.length > 0) {
      result = result.filter((bus) =>
        filters.amenities.every((amenity) =>
          bus.amenities.includes(amenity)
        )
      );
    }

    if (filters.rating > 0) {
      result = result.filter(
        (bus) => bus.rating >= filters.rating
      );
    }

    switch (selectedSort) {
      case "lowest-price":
        result.sort((a, b) => a.price - b.price);
        break;

      case "highest-rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "departure":
        result.sort(
          (a, b) =>
            parseTimeToMinutes(a.departure) -
            parseTimeToMinutes(b.departure)
        );
        break;

      case "arrival":
        result.sort(
          (a, b) =>
            parseTimeToMinutes(a.arrival) -
            parseTimeToMinutes(b.arrival)
        );
        break;

      case "duration":
        result.sort(
          (a, b) =>
            parseDurationToMinutes(a.duration) -
            parseDurationToMinutes(b.duration)
        );
        break;

      case "recommended":
      default:
        result.sort((a, b) => {
          if (a.topRated !== b.topRated) {
            return a.topRated ? -1 : 1;
          }

          if (a.rating !== b.rating) {
            return b.rating - a.rating;
          }

          return a.price - b.price;
        });
        break;
    }

    return result;
  }, [filters, selectedSort]);

  return (
    <div className="search-results-page">
      <main className="search-results-main">
        <div className="search-results-container">
          <div className="search-results-layout">

            <aside className="search-results-sidebar">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
              />
            </aside>

            <section className="search-results-content">

              <SortBar
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
                resultCount={filteredBuses.length}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />

              {filteredBuses.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "search-results-list grid-view"
                      : "search-results-list"
                  }
                >
                  {filteredBuses.map((bus) => (
                    <BusCard
                      key={bus.id}
                      bus={bus}
                      onSelect={handleBusSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">
                    🚌
                  </div>

                  <h2>No buses found</h2>

                  <p>
                    No buses match your current filters.
                    Try removing some filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              )}

            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;