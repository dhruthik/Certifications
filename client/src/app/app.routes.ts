import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
    { path:'',redirectTo: 'home', pathMatch: 'full'},
    { path:'home' , component:HomeComponent},
    { path:'user', component:UserDetailsComponent},
    { path: '**', redirectTo: 'home' }
];
