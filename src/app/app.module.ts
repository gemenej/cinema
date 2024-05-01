import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideClientHydration } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { reducers } from "./store/reducers";
import { ProductComponent } from './product/product.component';
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { DashboardComponent } from './dashboard/dashboard.component';
import { IqCardComponent } from './iq-card/iq-card.component';
import { SlickCarouselModule } from "ngx-slick-carousel";
import { CheckoutComponent } from './checkout/checkout.component';

export function playerFactory() {
  return player;
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    //console.log("state", state);
    //console.log("action", action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    AppComponent,
    TicketBookingComponent,
    LoaderComponent,
    NavbarComponent,
    ProductComponent,
    DashboardComponent,
    IqCardComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot({}, {}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgScrollbarModule,
    LottieModule.forRoot({ player: playerFactory }),
    SlickCarouselModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
