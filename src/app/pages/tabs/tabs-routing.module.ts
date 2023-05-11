import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';
import {authenticationGuard} from "../../services/auth/fit-note-auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/plans',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'body',
        loadChildren: () => import('./body/body.module').then( m => m.BodyPageModule)
      },
      {
        path: 'diet',
        loadChildren: () => import('./diet/diet.module').then( m => m.DietPageModule)
      },
      {
        path: 'history',
        canMatch: [authenticationGuard(['ADMIN'])],
        loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: 'plans',
        loadChildren: () => import('./plans/plans.module').then( m => m.PlansPageModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
