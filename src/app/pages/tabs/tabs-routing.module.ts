import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/training-plans',
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
        path: 'training-plans',
        loadChildren: () => import('./training-plans/training-plans.module').then(m => m.TrainingPlansPageModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('./more/more.module').then( m => m.MorePageModule)
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
