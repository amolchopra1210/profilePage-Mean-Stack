import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service'; 
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guards/auth.guard';

const appRoute : Routes = [
  { path : 'login', component : LoginComponent},
  { path : 'register', component : RegisterComponent},
  { path : '', component : HomeComponent},
  { path : 'dashboard', component : DashboardComponent, canActivate:[AuthGuard]},
  { path : 'profile', component : ProfileComponent, canActivate:[AuthGuard]}
  ]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    FlashMessagesModule,HttpModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
