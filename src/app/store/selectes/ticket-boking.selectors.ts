// import {AppState} from '../states';

// export const selectTicketBooking = (state: AppState) => state.ticketBooking.ticketCount;
// export const selectTicketData = (state: AppState) => state.ticketBooking.selectedTickets;

// ticket-boking.selectors.ts
import { createSelector } from "@ngrx/store";
import { AppState } from '../states';
export const selectTicketBookingState = (state: AppState) => state.ticketBooking;
//export const selectTicketBookingState = (state) => state.ticketBooking;

export const selectTicketBooking = createSelector(
  selectTicketBookingState,
  (state) => state.ticketCount
);

export const selectTicketData = createSelector(
  selectTicketBookingState,
  (state) => state.selectedTickets
);
