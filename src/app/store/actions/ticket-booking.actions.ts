import { Action } from "@ngrx/store";
import { TicketSeat } from "../../models/ticket-seat";

export enum TicketBookingActionTypes {
  countTicketBooking = "[TicketBooking] Count TicketBookings",
  selectTicket = "[TicketBooking] Select Ticket",
  deselectTicket = "[TicketBooking] Deselect",
}

export class TicketBookingAction implements Action {
  type: string;
  payload: {
    countTicket: number;
    tickets: TicketSeat[];
  };
}

export class CountTicketBooking implements Action {
  readonly type = TicketBookingActionTypes.countTicketBooking;

  constructor(readonly payload: { countTicket: number }) {}
}

// In your actions file
export class SelectTicket implements Action {
  readonly type = TicketBookingActionTypes.selectTicket;

  constructor(
    readonly payload: {
      tickets: Array<{
        row: string;
        column: number;
        schedule: { date: number; week: string };
        movieId: string;
        price: number;
      }>;
    }
  ) {}
}

export class DeselectTicket implements Action {
  readonly type = TicketBookingActionTypes.deselectTicket;

  constructor(
    readonly payload: {
      tickets: Array<{
        row: string;
        column: number;
        schedule: { date: number; week: string };
        movieId: string;
        price: number;
      }>;
    }
  ) {}
}

export type TicketBookingActions =
  | CountTicketBooking
  | SelectTicket
  | DeselectTicket;
