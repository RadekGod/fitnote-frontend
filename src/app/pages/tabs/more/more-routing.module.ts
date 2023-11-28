import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePage } from './more.page';

const routes: Routes = [
  {
    path: '',
    component: MorePage
  },
  {
  path: 'exercise-groups',
  loadChildren: () => import('./exercise/exercise-groups/exercise-groups.module').then( m => m.ExerciseGroupsPageModule)
},
  {
    path: 'user-settings',
    loadChildren: () => import('./user-settings/user-settings.module').then( m => m.UserSettingsPageModule)
  },
  {
    path: 'exercise-info',
    loadChildren: () => import('./exercise/exercise-groups/exercises/exercise-info/exercise-info.module').then(m => m.ExerciseInfoPageModule)
  },
  {
    path: 'activities',
    loadChildren: () => import('./activity/activities.module').then(m => m.ActivityPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePageRoutingModule {}
