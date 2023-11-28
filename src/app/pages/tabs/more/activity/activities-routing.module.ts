import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitiesPage } from './activities.page';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesPage
  },
  {
    path: 'edit-activity-type/:activityTypeId',
    loadChildren: () => import('./edit-activity-type/edit-activity-type.module').then( m => m.EditActivityTypePageModule)
  },
  {
    path: 'add-activity-type',
    loadChildren: () => import('./add-activity-type/add-activity-type.module').then( m => m.AddActivityTypePageModule)
  },
  {
    path: 'add-activity',
    loadChildren: () => import('./add-activity/add-activity.module').then( m => m.AddActivityPageModule)
  },
  {
    path: ':activityId',
    loadChildren: () => import('./activity-details/activity-details.module').then( m => m.ActivityDetailsPageModule)
  },
  {
    path: 'edit-activity/:activityId',
    loadChildren: () => import('./edit-activity/edit-activity.module').then( m => m.EditActivityPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityPageRoutingModule {}
