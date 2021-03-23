import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {LogInComponent} from './logIn/logIn.component';
import {RouterModule} from '@angular/router';
import {SignInComponent} from './signIn/signIn.component';
import {LRHeaderComponent} from './lrheader/lrheader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ArticleComponent} from './article/article.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material/material.module';
import {FontawesomeModule} from './modules/fontawesome/fontawesome.module';
import {ArticleService} from './services/article.service';
import {ResponseInterceptor} from './interceptors/response.interceptor';
import {PipesModule} from './pipes/pipes.module';
import {DateService} from './services/date.service';
import {StringService} from './services/string.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MiscService} from './services/misc.service';
import {CustomDatePipe} from './pipes/custumDate.pipe';


@NgModule({
    declarations: [
        AppComponent,
        LogInComponent,
        SignInComponent,
        ArticleComponent,
        PageNotFoundComponent,
        LRHeaderComponent,
        CustomDatePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        FontawesomeModule,
        PipesModule
    ],
    providers: [
        AuthenticationService,
        ArticleService,
        DateService,
        StringService,
        MiscService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
