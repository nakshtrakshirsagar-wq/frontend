import type {
  Dispatch,
  SetStateAction,
} from "react";

import {
  SlidersHorizontal,
  X,
  Clock3,
  BusFront,
  Wifi,
  Zap,
  BedDouble,
  Droplets,
  Star,
  ShieldCheck,
} from "lucide-react";

import "./FilterSidebar.css";

export interface Filters {
  minPrice: number;
  maxPrice: number;
  departure: string;
  busTypes: string[];
  amenities: string[];
  rating: number;
}

interface FilterSidebarProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

const DEFAULT_FILTERS: Filters = {
  minPrice: 300,
  maxPrice: 2500,
  departure: "All",
  busTypes: [],
  amenities: [],
  rating: 0,
};

const FilterSidebar = ({
  filters,
  setFilters,
}: FilterSidebarProps) => {

  /* ---------------- PRICE ---------------- */

  const handleMinPrice = (
    value: number
  ) => {
    setFilters((previous) => ({
      ...previous,
      minPrice: Math.min(
        value,
        previous.maxPrice - 100
      ),
    }));
  };

  const handleMaxPrice = (
    value: number
  ) => {
    setFilters((previous) => ({
      ...previous,
      maxPrice: Math.max(
        value,
        previous.minPrice + 100
      ),
    }));
  };

  /* ---------------- DEPARTURE ---------------- */

  const departureOptions = [
    {
      label: "All",
      time: "Any time",
    },
    {
      label: "Morning",
      time: "5 AM – 12 PM",
    },
    {
      label: "Afternoon",
      time: "12 PM – 5 PM",
    },
    {
      label: "Evening",
      time: "5 PM – 9 PM",
    },
    {
      label: "Night",
      time: "9 PM – 5 AM",
    },
  ];

  const handleDeparture = (
    value: string
  ) => {
    setFilters((previous) => ({
      ...previous,
      departure: value,
    }));
  };

  /* ---------------- BUS TYPES ---------------- */

  const busTypeOptions = [
    "AC Sleeper",
    "AC Seater",
    "Non AC Sleeper",
    "Non AC Seater",
  ];

  const handleBusType = (
    value: string
  ) => {
    setFilters((previous) => {
      const alreadySelected =
        previous.busTypes.includes(value);

      return {
        ...previous,
        busTypes: alreadySelected
          ? previous.busTypes.filter(
              (item) => item !== value
            )
          : [
              ...previous.busTypes,
              value,
            ],
      };
    });
  };

  /* ---------------- AMENITIES ---------------- */

  const amenityOptions = [
    {
      name: "WiFi",
      icon: Wifi,
    },
    {
      name: "Charging Point",
      icon: Zap,
    },
    {
      name: "Blanket",
      icon: BedDouble,
    },
    {
      name: "Water Bottle",
      icon: Droplets,
    },
  ];

  const handleAmenity = (
    value: string
  ) => {
    setFilters((previous) => {
      const alreadySelected =
        previous.amenities.includes(value);

      return {
        ...previous,
        amenities: alreadySelected
          ? previous.amenities.filter(
              (item) => item !== value
            )
          : [
              ...previous.amenities,
              value,
            ],
      };
    });
  };

  /* ---------------- RATING ---------------- */

  const ratingOptions = [
    4.5,
    4,
    3.5,
    3,
  ];

  const handleRating = (
    value: number
  ) => {
    setFilters((previous) => ({
      ...previous,
      rating:
        previous.rating === value
          ? 0
          : value,
    }));
  };

  /* ---------------- CLEAR ---------------- */

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const hasActiveFilters =
    filters.minPrice !== 300 ||
    filters.maxPrice !== 2500 ||
    filters.departure !== "All" ||
    filters.busTypes.length > 0 ||
    filters.amenities.length > 0 ||
    filters.rating > 0;

  return (
    <aside className="filter-sidebar">

      {/* HEADER */}

      <div className="filter-header">

        <div className="filter-title">

          <div className="filter-title-icon">
            <SlidersHorizontal
              size={17}
            />
          </div>

          <div>
            <h2>Filters</h2>

            <span>
              Refine your journey
            </span>
          </div>

        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="clear-filter-btn"
            onClick={clearAll}
          >
            <X size={13} />
            Clear All
          </button>
        )}

      </div>


      {/* PRICE */}

      <section className="filter-section">

        <div className="filter-section-heading">

          <div className="section-icon">
            ₹
          </div>

          <div>
            <h3>Price Range</h3>
            <span>Choose your budget</span>
          </div>

        </div>

        <div className="price-values">

          <div>
            <small>MIN</small>
            <strong>
              ₹{filters.minPrice}
            </strong>
          </div>

          <span>—</span>

          <div>
            <small>MAX</small>
            <strong>
              ₹{filters.maxPrice}
            </strong>
          </div>

        </div>

        <div className="range-wrapper">

          <input
            type="range"
            className="price-range"
            min="300"
            max="2500"
            step="50"
            value={filters.minPrice}
            onChange={(event) =>
              handleMinPrice(
                Number(event.target.value)
              )
            }
          />

          <input
            type="range"
            className="price-range price-range-max"
            min="300"
            max="2500"
            step="50"
            value={filters.maxPrice}
            onChange={(event) =>
              handleMaxPrice(
                Number(event.target.value)
              )
            }
          />

        </div>

        <div className="price-labels">
          <span>₹300</span>
          <span>₹2500+</span>
        </div>

      </section>


      {/* DEPARTURE */}

      <section className="filter-section">

        <div className="filter-section-heading">

          <div className="section-icon">
            <Clock3 size={16} />
          </div>

          <div>
            <h3>Departure Time</h3>
            <span>When do you want to leave?</span>
          </div>

        </div>

        <div className="departure-grid">

          {departureOptions.map(
            (option) => (
              <button
                type="button"
                key={option.label}
                className={
                  filters.departure ===
                  option.label
                    ? "departure-option selected"
                    : "departure-option"
                }
                onClick={() =>
                  handleDeparture(
                    option.label
                  )
                }
              >
                <strong>
                  {option.label}
                </strong>

                <span>
                  {option.time}
                </span>
              </button>
            )
          )}

        </div>

      </section>


      {/* BUS TYPE */}

      <section className="filter-section">

        <div className="filter-section-heading">

          <div className="section-icon">
            <BusFront size={16} />
          </div>

          <div>
            <h3>Bus Type</h3>
            <span>Select one or more</span>
          </div>

        </div>

        <div className="checkbox-list">

          {busTypeOptions.map(
            (type) => {

              const checked =
                filters.busTypes.includes(
                  type
                );

              return (
                <label
                  className="filter-checkbox"
                  key={type}
                >

                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleBusType(type)
                    }
                  />

                  <span className="custom-checkbox">
                    {checked && "✓"}
                  </span>

                  <span className="checkbox-name">
                    {type}
                  </span>

                </label>
              );
            }
          )}

        </div>

      </section>


      {/* AMENITIES */}

      <section className="filter-section">

        <div className="filter-section-heading">

          <div className="section-icon">
            <Zap size={16} />
          </div>

          <div>
            <h3>Amenities</h3>
            <span>Travel more comfortably</span>
          </div>

        </div>

        <div className="checkbox-list">

          {amenityOptions.map(
            ({
              name,
              icon: Icon,
            }) => {

              const checked =
                filters.amenities.includes(
                  name
                );

              return (
                <label
                  className="filter-checkbox"
                  key={name}
                >

                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleAmenity(name)
                    }
                  />

                  <span className="custom-checkbox">
                    {checked && "✓"}
                  </span>

                  <Icon
                    size={15}
                    className="amenity-filter-icon"
                  />

                  <span className="checkbox-name">
                    {name}
                  </span>

                </label>
              );
            }
          )}

        </div>

      </section>


      {/* RATING */}

      <section className="filter-section">

        <div className="filter-section-heading">

          <div className="section-icon">
            <Star
              size={16}
              fill="currentColor"
            />
          </div>

          <div>
            <h3>Bus Rating</h3>
            <span>Minimum rating</span>
          </div>

        </div>

        <div className="rating-options">

          {ratingOptions.map(
            (rating) => {

              const selected =
                filters.rating === rating;

              return (
                <button
                  type="button"
                  key={rating}
                  className={
                    selected
                      ? "rating-option selected"
                      : "rating-option"
                  }
                  onClick={() =>
                    handleRating(rating)
                  }
                >
                  <Star
                    size={14}
                    fill="currentColor"
                  />

                  <strong>
                    {rating}+
                  </strong>

                  {selected && (
                    <X
                      size={13}
                      className="remove-rating"
                    />
                  )}
                </button>
              );
            }
          )}

        </div>

      </section>


      {/* TRUST BOX */}

      <div className="filter-trust-box">

        <div className="trust-icon">
          <ShieldCheck size={19} />
        </div>

        <div>
          <strong>
            Trusted Booking
          </strong>

          <span>
            Secure payments & verified
            operators
          </span>
        </div>

      </div>

    </aside>
  );
};

export default FilterSidebar;