import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LocationService } from './services/location.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { DecodeJwtService } from './services/decode-jwt.service';
import { JobPositionService } from './services/job-position.service';
import { JobTypeService } from './services/job-type.service';
import { DataTransferService } from './services/data-transfer.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    LocationService,
    AuthService,
    DecodeJwtService,
    JobPositionService,
    JobTypeService,
    DataTransferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
