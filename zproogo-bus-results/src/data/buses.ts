import type { Bus } from "../types/bus";

export const buses: Bus[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1711009189869-24e24b25daf2?auto=format&fit=crop&fm=jpg&q=85&w=1600",
    name: "Volvo 9600",
    type: "AC Sleeper",
    rating: 4.7,
    reviews: 234,
    departure: "08:30 PM",
    departurePlace: "Pune",
    arrival: "07:15 AM",
    arrivalPlace: "Goa",
    duration: "10h 45m",
    price: 1899,
    amenities: [
      "WiFi",
      "Charging Point",
      "Blanket",
      "Water Bottle",
    ],
    topRated: true,
    cancellation: true,
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1660315268805-33356a09b060?auto=format&fit=crop&fm=jpg&q=85&w=1600",
    name: "Scania Metrolink",
    type: "AC Seater",
    rating: 4.5,
    reviews: 156,
    departure: "10:15 PM",
    departurePlace: "Pune",
    arrival: "09:35 AM",
    arrivalPlace: "Goa",
    duration: "11h 20m",
    price: 1599,
    amenities: [
      "WiFi",
      "Charging Point",
      "Blanket",
    ],
    topRated: true,
    cancellation: true,
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1580064007984-aabd28acd557?auto=format&fit=crop&fm=jpg&q=85&w=1600",
    name: "Mercedes Benz",
    type: "AC Sleeper",
    rating: 4.3,
    reviews: 98,
    departure: "09:00 PM",
    departurePlace: "Pune",
    arrival: "09:30 AM",
    arrivalPlace: "Goa",
    duration: "12h 30m",
    price: 1749,
    amenities: [
      "WiFi",
      "Charging Point",
      "Blanket",
      "Water Bottle",
    ],
    topRated: false,
    cancellation: true,
  },

  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1589631718948-38646a41c00a?auto=format&fit=crop&fm=jpg&q=85&w=1600",
    name: "Volvo 9400",
    type: "Non AC Seater",
    rating: 4.1,
    reviews: 72,
    departure: "11:45 PM",
    departurePlace: "Pune",
    arrival: "12:00 PM",
    arrivalPlace: "Goa",
    duration: "12h 15m",
    price: 1299,
    amenities: [
      "WiFi",
      "Charging Point",
    ],
    topRated: false,
    cancellation: false,
  },
];