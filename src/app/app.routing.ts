import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {LogInComponent} from './logIn/logIn.component';
import {NgModule} from '@angular/core';
import {SignInComponent} from './signIn/signIn.component';
import {ArticleComponent} from './article/article.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthKeepService} from './services/auth-keep.service';

// @ts-ignore
const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},
  {path: 'connexion', component: LogInComponent, canActivate: [AuthKeepService]},
  {path: 'inscription', component: SignInComponent},
    {
        path: 'article', children: [
            {
                path: '', component: ArticleComponent, pathMatch: 'full', canActivate: [AuthGuardService]
            },
            {
                path: ':id', component: ArticleComponent, canActivate: [AuthGuardService]
            },
            {
                path: ':id/:action', component: ArticleComponent, canActivate: [AuthGuardService]
            }

        ]
    },
    {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ]
})
export class AppRoutingModule {
}
