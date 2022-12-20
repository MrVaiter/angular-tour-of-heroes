import { NgModule } from '@angular/core';
import { HeroesComponent } from './components/heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';

const routes: Routes = [
  { path: '', redirectTo: '/authorization', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'authorization', component: AuthorizationComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
