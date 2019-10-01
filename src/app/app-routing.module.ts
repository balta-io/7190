import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'post', canActivate: [AuthGuard], loadChildren: () => import('./pages/post/post.module').then(m => m.PostPageModule) },
  { path: 'take-picture', canActivate: [AuthGuard], loadChildren: () => import('./pages/take-picture/take-picture.module').then(m => m.TakePicturePageModule) },
  { path: 'map', canActivate: [AuthGuard], loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
