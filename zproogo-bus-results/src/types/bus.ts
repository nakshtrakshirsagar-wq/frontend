export interface Bus {
  id: number;

  image: string;

  name: string;

  type:
    | "AC Sleeper"
    | "AC Seater"
    | "Non AC Sleeper"
    | "Non AC Seater";

  rating: number;

  reviews: number;

  departure: string;

  departurePlace: string;

  arrival: string;

  arrivalPlace: string;

  duration: string;

  price: number;

  amenities: string[];

  topRated: boolean;

  cancellation: boolean;
}