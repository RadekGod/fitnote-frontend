import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

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
        // canMatch: [userRoleGuard([FitNoteUserRole.ADMIN])],
        loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: 'plans',
        loadChildren: () => import('./plans/plans.module').then( m => m.PlansPageModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
      },
      {
        path: 'user-data',
        loadChildren: () => import('../user-management/user-management.module').then(m => m.UserManagementPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
