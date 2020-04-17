import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPage} from "./pages/login/login.page";
import {MainPage} from "./pages/main/main.page";
import {TestPage} from "./pages/test/test.page";
import {UserAuthGuard, UserNotAuthGuard} from "./services/route-guard";
import {ClientListFrag} from "./fragments/client/client-list.frag";


const routes: Routes = [
  {
    path:'login',
    component:LoginPage,
    canActivate:[UserNotAuthGuard]
  },
  {
    path:'main',
    component:MainPage,
    canActivate:[UserAuthGuard],
    children:[
      {
        path:'client/list',
        component:ClientListFrag
      },
      {
        path:'**',
        redirectTo:'client/list'
      }
    ]
  },
  {
    path:'test',
    component:TestPage
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
