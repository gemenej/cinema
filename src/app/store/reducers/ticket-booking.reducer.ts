import {
  initialTicketBookingState,
  TicketBookingState,
} from "../states/ticket-booking.state";
import {
  DeselectTicket,
  TicketBookingAction,
  TicketBookingActionTypes,
} from "../actions/ticket-booking.actions";
import { Action } from '@ngrx/store';

export function TicketBookingReducer(
  // state: TicketBookingState = initialTicketBookingState,
  // action: TicketBookingAction
  state: TicketBookingState = initialTicketBookingState,
  action: Action
): TicketBookingState {
  const ticketBookingAction = action as TicketBookingAction;
  switch (ticketBookingAction.type) {
    case TicketBookingActionTypes.countTicketBooking:
      return {
        ...state,
        ticketCount: ticketBookingAction.payload.countTicket,
      };
    case TicketBookingActionTypes.selectTicket:
      return {
        ...state,
        selectedTickets: [...(state.selectedTickets || []), ...ticketBookingAction.payload.tickets],
      };
    case TicketBookingActionTypes.deselectTicket:
      //if (action instanceof DeselectTicket) {
      //  const deselectTicketAction = action;
        return {
          ...state,
          selectedTickets: state.selectedTickets?.filter(
            (seat) =>
              !ticketBookingAction.payload.tickets.some(
                (ticket) =>
                  ticket.row === seat.row && ticket.column === seat.column && ticket.schedule?.date === seat.schedule?.date && ticket.schedule?.week === seat.schedule?.week && ticket.movieId === seat.movieId
              )
          ),
        };
      //} else {
      //  return state;
      //}
    default:
      return state;
  }
}
