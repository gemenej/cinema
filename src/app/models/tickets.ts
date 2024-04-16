export interface boxOfficeSeat {
  id: number;
  class: string;
  type: string;
  price: number;
  price_format: string;
  tickets: TicketRow;
}

export interface TicketRow {
  A?: Seat;
  B?: Seat;
  C?: Seat;
  D?: Seat;
  E?: Seat;
  F?: Seat;
  G?: Seat;
  H?: Seat;
}

export interface Seat {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
  7?: number;
  8?: number;
  9?: number;
  10?: number;
  11?: number;
  12?: number;
  13?: number;
  14?: number;
  15?: number;
  16?: number;
  17?: number;
  18?: number;
}

export interface Movie {
  movieId: string;
  title: string;
  image: string;
  year: string;
  director: string;
  duration: string;
  genre: string[];
  rate: string;
  dates_in_cinema: CinemaDate[];
}

export interface CinemaDate {
  date: number;
  week: string;
  time: string;
  places_booked: { row: string; column: number; }[];
}
