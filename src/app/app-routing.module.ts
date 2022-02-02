import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  // { path: '', loadChildren: () => import('./public/public.module').then((m) => m.PublicModule) },
  { path: '**', redirectTo: 'main/patient-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
