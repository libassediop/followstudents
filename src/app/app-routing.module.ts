import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/auth/login/login.component';
import { FirstConnexionComponent } from './account/auth/first-connexion/first-connexion.component';
import { AuthGuard } from './account/auth/auth-guard.service';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  //{ path: '**', redirectTo: '/account'},
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  // tslint:disable-next-line: max-line-length
 // { path: 'pages', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), 
  canActivate: [AuthGuard]},
 // { path: '**', component: Page404Component },
 {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'first',
    component: FirstConnexionComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
     { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' }
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
