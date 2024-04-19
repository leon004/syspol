import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoricalComponent } from './historical/historical.component';
import { HomeComponent } from './home/home.component';
import { InfractionComponent } from './infraction/infraction.component';
import { ProfileComponent } from './profile/profile.component';
import { BottomNavComponent } from './shared/bottom-nav/bottom-nav.component';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DataService } from './data.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatList, MatListModule, MatListItem, MatNavList } from '@angular/material/list';
import { JuezComponent } from './juez/juez.component';
import { CarDetailComponent } from './car-detail/car-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoricalComponent,
    HomeComponent,
    InfractionComponent,
    ProfileComponent,
    BottomNavComponent,
    JuezComponent,
    CarDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatIcon,
     MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule,MatStepperModule, MatSelectModule, ReactiveFormsModule, MatListModule, MatListItem, MatNavList
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
