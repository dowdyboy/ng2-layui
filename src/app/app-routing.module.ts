import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPage} from "./pages/login/login.page";
import {MainPage} from "./pages/main/main.page";


const routes: Routes = [
  {
    path:'login',
    component:LoginPage
  },
  {
    path:'main',
    component:MainPage
  },
  {
    path:'**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
