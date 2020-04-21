import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPage} from "./pages/login/login.page";
import {MainPage} from "./pages/main/main.page";
import {TestPage} from "./pages/test/test.page";
import {AdminRoleGuard, UserAuthGuard, UserNotAuthGuard} from "./services/route-guard";
import {ClientListFrag} from "./fragments/client/client-list.frag";
import {ClientAddFrag} from "./fragments/client/client-add.frag";
import {ClientModifyFrag} from "./fragments/client/client-modify.frag";
import {UserListFrag} from "./fragments/user/user-list.frag";
import {UserAddFrag} from "./fragments/user/user-add.frag";
import {UserModifyFrag} from "./fragments/user/user-modify.frag";
import {StatisticFrag} from "./fragments/statistic/statistic.frag";


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
        component:ClientListFrag,
        canActivate:[AdminRoleGuard]
      },
      {
        path:'client/add',
        component:ClientAddFrag,
        canActivate:[AdminRoleGuard]
      },
      {
        path:'client/modify/:client_id',
        component:ClientModifyFrag,
        canActivate:[AdminRoleGuard]
      },
      {
        path:'user/list',
        component:UserListFrag,
        canActivate:[AdminRoleGuard]
      },
      {
        path:'user/add',
        component:UserAddFrag,
        canActivate:[AdminRoleGuard]
      },
      {
        path:'user/modify/:username',
        component:UserModifyFrag,
        canActivate:[AdminRoleGuard]
      },
      {
        path:'statistic',
        component:StatisticFrag
      },
      {
        path:'statistic/:client_id',
        component:StatisticFrag
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
