export class TicketSeat {
  type?: string;
  row: string;
  column: number;
  price: number;
  schedule?: {
    date: number;
    week: string;
  }
  movieId?: string;
  title?: string;
  image?: string;
}
