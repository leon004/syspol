import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoricalComponent } from './historical/historical.component';
import { InfractionComponent } from './infraction/infraction.component';
import { JuezComponent } from './juez/juez.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'historical', component: HistoricalComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'infraction', component: InfractionComponent },
  { path: 'juez', component: JuezComponent },
  { path: 'car-detail', component: CarDetailComponent },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
