import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Store } from '@ngrx/store';
import {
  CountTicketBooking,
  DeselectTicket,
  SelectTicket,
  TicketBookingAction,
} from '../store/actions/ticket-booking.actions';
import * as jQuery from 'jquery';
import {
  selectTicketBooking,
  selectTicketData,
} from '../store/selectes/ticket-boking.selectors';
import { Observable } from 'rxjs';
import { Movie, Seat, TicketRow, boxOfficeSeat } from 'src/app/models/tickets';
import Movies from '../fake-api/json/Movies.json';
import DefaultBoxOfficeSeats from '../fake-api/json/DefaultBoxOfficeSeats.json';
import { ActivatedRoute } from '@angular/router';
import { startWith, take } from 'rxjs/operators';
import { TicketSeat } from '../models/ticket-seat';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styles: [],
})
export class TicketBookingComponent implements OnInit {
  movies = Movies.movies;

  selected = [];

  optionsData: AnimationOptions = {
    path: '/assets/images/small/data2.json',
  };

  // transform new Date().getDate() to current date object
  currentDate: { date: number; week: string } = {
    date: new Date().getDate(),
    week: new Date().toLocaleString('en-us', { weekday: 'short' }),
  };

  dates: { date: number; week: string }[];

  slideConfig = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 9,
    slidesToScroll: 1,
    focusOnSelect: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '60',
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '30',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '15',
          slidesToShow: 1,
        },
      },
    ],
    nextArrow:
      '<a href="javascript:void(0);" class="ri-arrow-right-s-line right"></a>',
    prevArrow:
      '<a href="javascript:void(0);" class="ri-arrow-left-s-line left"></a>',
  };

  boxOfficesConfig = {
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    columns: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      ' ',
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
    ],
  };

  boxOfficeSeats: boxOfficeSeat[] = [];

  countTicket = 0;
  cart$: Observable<TicketSeat[] | undefined>;
  movieId: string;
  movie: Movie;

  constructor(private activeRoute: ActivatedRoute, private store: Store<any>) {
    this.activeRoute.params.pipe(take(1)).subscribe((params) => {
      if (params['movieId']) {
        this.movieId = params['movieId'];
        //console.log('movieId: ', this.movieId);
      }
    });

    // this.dates = Array.from({ length: 30 }, (_, i) => {
    //   let date = new Date();
    //   date.setDate(date.getDate() + i);
    //   return {
    //     date: date.getDate(),
    //     week: date.toLocaleString("en-us", { weekday: "short" }),
    //   };
    // });

    this.movie = this.movies.filter(
      (item: any) => item.movieId == this.movieId.toString()
    )[0];
    //console.log('movie: ', this.movie);

    this.dates = this.movie.dates_in_cinema.map((item) => {
      return {
        date: item.date,
        week: item.week,
      };
    });

    // unshift previous date to dates array
    //this.dates.

    //this.slideConfig.slidesToShow = this.dates.length > 5 ? 5 : this.dates.length;
    //this.slideConfig.centerMode = this.dates.length > 5 ? true : false;

    this.generateDefaultSeats();

    this.store.select(selectTicketBooking).subscribe((ticketCount) => {
      this.countTicket = ticketCount;
    });

    this.store.select(selectTicketData).subscribe((selectedTickets) => {
      this.selected = [];
      //console.log(selectedTickets);
      selectedTickets?.forEach((ticket: TicketSeat) => {
        if (ticket.schedule?.date !== this.currentDate.date) return;
        if (ticket.movieId != this.movieId) return;
        let ticketRowColumn = ticket.row + '-' + ticket.column;
        (this.selected as any)[ticketRowColumn] = true;
      });
    });

    this.cart$ = this.store.select(selectTicketData);
  }

  ngOnInit() {}

  selectedSeat(
    index: number,
    row: string,
    column: number | string,
    price: number
  ) {
    let countTicketBooking = 0;
    let ticketRowColumn = row + '-' + column;
    if ((this.selected as any)[ticketRowColumn] === undefined) {
      (this.selected as any)[ticketRowColumn] = true;
      countTicketBooking = 1;
      this.store.dispatch(
        new SelectTicket({
          tickets: [
            {
              row: row,
              column: column as number,
              schedule: {
                date: this.currentDate.date,
                week: this.currentDate.week,
              },
              movieId: this.movieId,
              price: price,
            },
          ],
        })
      );
    } else {
      delete (this.selected as any)[ticketRowColumn];
      countTicketBooking = -1;
      this.store.dispatch(
        new DeselectTicket({
          tickets: [
            {
              row: row,
              column: column as number,
              schedule: {
                date: this.currentDate.date,
                week: this.currentDate.week,
              },
              movieId: this.movieId,
              price: price,
            },
          ],
        })
      );
    }

    this.store.dispatch(
      new CountTicketBooking({
        countTicket: this.countTicket + countTicketBooking,
      })
    );
  }

  // generate all seats
  generateDefaultSeats() {
    this.boxOfficeSeats = JSON.parse(
      JSON.stringify(DefaultBoxOfficeSeats.boxOfficeSeats)
    );
    this.setBookingPlacesFromDate(this.currentDate);
  }

  // set booking places based on date in params & movie schedule
  setBookingPlacesFromDate(currentDate: { date: number; week: string }) {
    //console.log('movies: ', this.movies);
    //console.log('movieId: ', this.movieId);
    const movie = this.movies.filter(
      (item: any) => item.movieId == this.movieId.toString()
    );
    //console.log('movie: ', movie);
    const schedule = movie[0].dates_in_cinema;
    this.boxOfficeSeats = JSON.parse(
      JSON.stringify(DefaultBoxOfficeSeats.boxOfficeSeats)
    );

    const date = currentDate.date;
    const places = schedule.filter((item: any) => item.date === date);
    const places_booked = places[0].places_booked;

    this.boxOfficeSeats = this.fillBookingPlaces(
      places_booked,
      this.boxOfficeSeats
    );

    this.store.select(selectTicketData).subscribe((selectedTickets) => {
      this.selected = [];
      //console.log(selectedTickets);
      selectedTickets?.forEach((ticket) => {
        //if (ticket.schedule.date !== date && ticket.movieId != this.movieId) return;
        if (ticket.schedule?.date !== date) return;
        if (ticket.movieId != this.movieId) return;
        (this.selected as any)[ticket.row + '-' + ticket.column] = true;
      });
    });
  }

  fillBookingPlaces(places_booked: any, boxOffice: any) {
    let boxOfficeCopy = JSON.parse(JSON.stringify(boxOffice)); // Create a deep copy of boxOffice
    for (let i = 0; i < places_booked.length; i++) {
      const place = places_booked[i];
      boxOfficeCopy.forEach((box: any) => {
        for (let key in box.tickets[place.row]) {
          if (parseInt(key) === place.column) {
            box.tickets[place.row][key] = 1;
          }
        }
      });
    }
    return boxOfficeCopy;
  }

  // generate numbers of seats based on request
  generateItems(from: number, to: number): Seat {
    let items: { [key: number]: number } = {};
    for (let i = from; i <= to; i++) {
      items[i] = 0;
    }
    return items;
  }

  slickInit(event: any) {
    //console.log("slick initialized");
    let currentIndex = this.dates.findIndex(
      (item) => item.date === this.currentDate.date
    );
    event.slick.slickGoTo(currentIndex);
  }

  afterSlideChange(event: any) {
    //console.log(event.slick);
    this.boxOfficeSeats = [];
    this.currentDate = this.dates[event.slick.currentSlide];
    this.setBookingPlacesFromDate(this.currentDate);
  }

  closePayment() {
    jQuery('.iq-sidebar-right-menu').removeClass('film-side');
  }

  getSeatStatus(
    tickets: TicketRow,
    row: string,
    column: number | string
  ): number | undefined {
    //console.log('getSeatStatus', tickets, row, column);
    return (tickets as { [key: string]: any[] })[row][column as number];
  }

  setActiveSeat(row: string, column: number | string): string {
    return (this.selected as any)[row + '-' + column] ? 'active' : '';
  }
}
