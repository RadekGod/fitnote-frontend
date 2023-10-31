import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingPlanPage } from './training-plan.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingPlanPage
  },
  {
    path: 'exercises/:category',
    loadChildren: () => import('../../more/exercise/exercise-groups/exercises/exercises.module').then(m => m.ExercisesPageModule)
  },
  {
    path: 'exercise-groups',
    loadChildren: () => import('../../more/exercise/exercise-groups/exercise-groups.module').then(m => m.ExerciseGroupsPageModule)
  },
  {
    path: 'add-exercise',
    loadChildren: () => import('./exercise/add-exercise/add-exercise.module').then(m => m.AddExercisePageModule)
  },
  {
    path: 'add-exercise-to-training-plan/:exerciseId',
    loadChildren: () => import('./add-exercise-to-training-plan/add-exercise-to-training-plan.module').then( m => m.AddExerciseToTrainingPlanPageModule)
  },
  {
    path: 'edit-exercise-in-training-plan/:trainingPlanExerciseId',
    loadChildren: () => import('./edit-training-plan-exercise/edit-training-plan-exercise.module').then(m => m.EditExerciseInTrainingPlanPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPlanPageRoutingModule {}
