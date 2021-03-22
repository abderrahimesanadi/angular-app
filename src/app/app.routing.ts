import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {NgModule} from '@angular/core';
import {ArticleComponent} from './article/article.component';

// @ts-ignore
const APP_ROUTES: Routes = [
  {path: 'article/:id', component: ArticleComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ]
})
export class AppRoutingModule {
}
