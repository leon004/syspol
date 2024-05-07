import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { InfractionComponent } from './components/infraction/infraction.component';
import { JuezComponent } from './components/juez/juez.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginRedirectGuard } from './auth/login-redirect.guard';
import { RoleGuard } from './auth/role.guard';
import { FormPoliceComponent } from './components/form-police/form-police.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'historical', component: HistoricalComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'infraction', component: InfractionComponent, canActivate: [AuthGuard] },
  { path: 'juez', component: JuezComponent, canActivate: [AuthGuard] },
  { path: 'car-detail', component: CarDetailComponent, canActivate: [AuthGuard] },
  { path: 'form-police', component: FormPoliceComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
