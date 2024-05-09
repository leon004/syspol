import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { HomeComponent } from './components/home/home.component';
import { InfractionComponent } from './components/infraction/infraction.component';
import { ProfileComponent } from './components/profile/profile.component';
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
import { DataService } from './services/data.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatList, MatListModule, MatListItem, MatNavList } from '@angular/material/list';
import { JuezComponent } from './components/juez/juez.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormPoliceComponent } from './components/form-police/form-police.component';

const firebaseConfig = {
  apiKey: "AIzaSyAastVsls81QPPB0N--vU0bM0-NjMrB9lo",
  authDomain: "syspol-storage.firebaseapp.com",
  projectId: "syspol-storage",
  storageBucket: "syspol-storage.appspot.com",
  messagingSenderId: "t711653640080",
  appId: "1:711653640080:web:36511ae6940ad6fd5b5515"
};

@NgModule({
  declarations: [
    AppComponent,
    HistoricalComponent,
    HomeComponent,
    InfractionComponent,
    ProfileComponent,
    BottomNavComponent,
    JuezComponent,
    CarDetailComponent,
    LoginComponent,
    FormPoliceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatIcon,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatListItem,
    MatNavList,
    MatSnackBarModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
