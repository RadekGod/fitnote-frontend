import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, PreloadAllModules, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {canMatch, FitNoteAuthGuard} from "./services/auth/fit-note-auth-guard.service";

export type UserRole = 'ADMIN' | 'STANDARD_USER';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    // canMatch: [() => canMatch(['ADMIN'])],
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
