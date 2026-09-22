import {
  Star,
  MapPin,
  Clock3,
  Wifi,
  Zap,
  BedDouble,
  Droplets,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import type { Bus } from "../../types/bus";

import "./BusCard.css";

interface BusCardProps {
  bus: Bus;

  onSelect: (bus: Bus) => void;
}


const BusCard = ({
  bus,
  onSelect,
}: BusCardProps) => {

  return (

    <article className="bus-card">


      {/* =================================================
          BUS IMAGE
          ================================================= */}

      <div className="bus-image-wrapper">

        <img
          src={bus.image}
          alt={bus.name}
          className="bus-image"
        />


        {bus.topRated && (

          <div className="top-rated-badge">

            <Star
              size={12}
              fill="currentColor"
            />

            Top Rated

          </div>

        )}


        <div className="bus-image-overlay" />

      </div>


      {/* =================================================
          MAIN BUS CONTENT
          ================================================= */}

      <div className="bus-main-content">


        {/* =================================================
            HEADER
            ================================================= */}

        <div className="bus-header">

          <div className="bus-title-area">

            <h3>
              {bus.name}
            </h3>

            <span className="bus-type">
              {bus.type}
            </span>

          </div>


          <div className="bus-rating">

            <Star
              size={13}
              fill="currentColor"
            />

            <strong>
              {bus.rating}
            </strong>

            <span>
              ({bus.reviews})
            </span>

          </div>

        </div>


        {/* =================================================
            JOURNEY
            ================================================= */}

        <div className="journey-section">


          {/* DEPARTURE */}

          <div className="journey-point">

            <strong>
              {bus.departure}
            </strong>

            <span>
              <MapPin size={11} />
              {bus.departurePlace}
            </span>

          </div>


          {/* DURATION */}

          <div className="journey-duration">

            <div className="duration-line">

              <span className="journey-dot" />

              <span className="journey-line" />

              <Clock3 size={13} />

              <span className="journey-line" />

              <span className="journey-dot" />

            </div>

            <span className="duration-text">
              {bus.duration}
            </span>

          </div>


          {/* ARRIVAL */}

          <div className="journey-point arrival-point">

            <strong>
              {bus.arrival}
            </strong>

            <span>
              <MapPin size={11} />
              {bus.arrivalPlace}
            </span>

          </div>

        </div>


        {/* =================================================
            AMENITIES
            ================================================= */}

        <div className="amenities-row">

          {bus.amenities.map(
            (amenity) => {

              let Icon = Zap;

              if (
                amenity === "WiFi"
              ) {
                Icon = Wifi;
              }

              if (
                amenity === "Charging Point"
              ) {
                Icon = Zap;
              }

              if (
                amenity === "Blanket"
              ) {
                Icon = BedDouble;
              }

              if (
                amenity === "Water Bottle"
              ) {
                Icon = Droplets;
              }

              return (

                <span
                  className="amenity-item"
                  key={amenity}
                >

                  <Icon size={12} />

                  {amenity}

                </span>

              );

            }
          )}

        </div>


        {/* =================================================
            BENEFITS
            ================================================= */}

        <div className="bus-benefits">

          {bus.cancellation && (

            <span className="benefit cancellation">

              <ShieldCheck size={13} />

              Free Cancellation

            </span>

          )}


          <span className="benefit confirmation">

            <CheckCircle2 size={13} />

            Instant Confirmation

          </span>

        </div>

      </div>


      {/* =================================================
          PRICE SECTION
          ================================================= */}

      <div className="bus-price-section">


        <span className="starting-text">
          Starting from
        </span>


        <div className="bus-price">

          <span className="currency">
            ₹
          </span>

          {bus.price.toLocaleString("en-IN")}

        </div>


        <span className="tax-text">
          Includes taxes
        </span>


        <button
          type="button"
          className="select-seat-btn"
          onClick={() =>
            onSelect(bus)
          }
        >

          Select Seats

          <ArrowRight size={15} />

        </button>


        <span className="seat-info">
          Seats available
        </span>

      </div>

    </article>

  );
};

export default BusCard;