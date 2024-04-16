import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
//import jQuery from "jquery";
import * as jQuery from 'jquery';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: [],
})
export class NavbarComponent implements OnInit {
  breadCrumbItems = [
    {
      isActive: false,
      label: "Dashboard",
      link: "/",
    },
    {
      isActive: true,
      label: "Dashboard",
      link: "/dashboard",
    },
  ];

  messagesList = [
    {
      title: "Nik Emma Watson",
      image: "/assets/images/user/01.jpg",
      link: "#",
      date_format: "13 Apr",
    },
    {
      title: "Lorem Ipsum Watson",
      image: "/assets/images/user/02.jpg",
      link: "#",
      date_format: "20 Jun",
    },
    {
      title: "Why do we use it?",
      image: "/assets/images/user/03.jpg",
      link: "#",
      date_format: "08 July",
    },
    {
      title: "Variations Passages",
      image: "/assets/images/user/04.jpg",
      link: "#",
      date_format: "12 Sep",
    },
    {
      title: "Lorem Ipsum generators",
      image: "/assets/images/user/05.jpg",
      link: "#",
      date_format: "5 Dec",
    },
  ];

  notificationList = [
    {
      title: "New Order Received",
      sub_title: "Lorem is simply",
      image: null,
      link: "#",
      date_format: "23 hrs ago",
    },
    {
      title: "Emma Watson Nik",
      sub_title: "95 MB",
      image: "/assets/images/user/01.jpg",
      link: "#",
      date_format: "Just Now",
    },
    {
      title: "New customer is join",
      sub_title: "John Nik",
      image: "/assets/images/user/02.jpg",
      link: "#",
      date_format: "5 days ago",
    },
    {
      title: "Updates Available",
      sub_title: "120 MB",
      image: "/assets/images/small/jpg.svg",
      link: "#",
      date_format: "Just Now",
    },
  ];

  countTicket = 0;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.subscribe(
      (state) => (this.countTicket = state.ticketBooking.ticketCount)
    );
  }

  clickPaymentShow(countTicketBooking: number) {
    if (countTicketBooking > 0) {
      if (jQuery(".iq-sidebar-right-menu").hasClass("film-side")) {
        jQuery(".iq-sidebar-right-menu").removeClass("film-side");
      } else {
        jQuery(".iq-sidebar-right-menu").addClass("film-side");
      }
    }
  }

  closePayment() {
    jQuery(".iq-sidebar-right-menu").removeClass("film-side");
  }
}
