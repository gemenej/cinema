import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ProductComponent
      },
      {
        path: "ticket-booking/:movieId",
        component: TicketBookingComponent,
      },
      {
        path: "checkout",
        component: CheckoutComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
