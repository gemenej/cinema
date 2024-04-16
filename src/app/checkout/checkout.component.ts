import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as jQuery from 'jquery';
import { Observable } from 'rxjs';
import { CountTicketBooking, DeselectTicket } from 'src/app/store/actions/ticket-booking.actions';
import { selectTicketBooking, selectTicketData } from 'src/app/store/selectes/ticket-boking.selectors';
import { Movie, Seat, TicketRow, boxOfficeSeat } from "src/app/models/tickets";
import Movies from "../fake-api/json/Movies.json";
import { TicketSeat } from '../models/ticket-seat';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit {

  movies = Movies.movies;
  tickets: TicketSeat[];
  countTicket = 0;
  discount: boolean = false;
  ticketsSum: number;

  constructor(private store: Store<any>) {
    this.store.select(selectTicketBooking).subscribe((ticketCount) => {
      this.countTicket = ticketCount;
      this.discount = this.countTicket >= 5 ? true : false;
    });

    this.store.select(selectTicketData).subscribe((selectedTickets) => {
      this.tickets = [];
      this.ticketsSum = 0;
      console.log(selectedTickets);
      selectedTickets?.map((ticket) => {
        let movie = this.movies.find((movie: Movie) => movie.movieId === ticket.movieId);
        console.log(movie);
        ticket = {
          ...ticket,
          title: movie.title,
          image: movie.image,
        }
        this.tickets.push(ticket);
        this.ticketsSum += ticket.price;
      });
    });
  }

  ngOnInit(): void {
  }

  deleteTicket(ticket: TicketSeat) {
    let countTicketBooking = -1;
    this.store.dispatch(
      new DeselectTicket({
        tickets: [
          {
            row: ticket.row,
            column: ticket.column,
            schedule: ticket.schedule as any,
            movieId: ticket.movieId as any,
            price: ticket.price,
          },
        ],
      })
    );
    this.store.dispatch(
      new CountTicketBooking({
        countTicket: this.countTicket + countTicketBooking,
      })
    );
    this.discount = this.countTicket >= 5 ? true : false;
    //console.log(this.ticketsSum, ticket.price);
    //this.ticketsSum -= ticket.price;
  }

  placeOrder() {
    jQuery('#cart').removeClass('show');
    jQuery('#address').addClass('show');
    jQuery('#step1').removeClass('active');
    jQuery('#step1').addClass('done');
    jQuery('#step2').addClass('active');
  }

  // jQuery('#place-order').click(function(){
  // });
  deliverAddress() {
    // jQuery('#deliver-address').click(function(){
    // });
        jQuery('#address').removeClass('show');
        jQuery('#payment').addClass('show');
        jQuery('#step2').removeClass('active');
        jQuery('#step2').addClass('done');
        jQuery('#step3').addClass('active');
  }

}
