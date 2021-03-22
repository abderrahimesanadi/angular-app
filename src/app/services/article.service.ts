import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Article} from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

    public currentArticle: Article;
    public isBusy: boolean = false;
    public tags: any = null;
    public nextPage: number = 1;

    constructor(
        public http: HttpClient) {
    }

    public getArticle(id: string): Observable<Article> {
      return this.http.get<Article>('/api/article?idArticle=' + id).pipe(
          tap((article: Article)=> {
               console.log(article);
              this.currentArticle = article;
          })
      )
    }

    public retrieveTags() : Promise<any> {

      return new Promise((resolve, reject)=> {

          if (!this.tags) {

              this.http.get<any>('/api/tags').subscribe((tags:any) => {

                  console.log(tags);
                  this.tags = tags.map(tag => {
                      tag.chosen = false;
                      tag.selectedForSearch = false;
                      return tag;
                  });
                  resolve(this.tags);
              })

          } else {

              this.tags = this.tags.map(tag => {
                  tag.chosen = false;
                  tag.selectedForSearch = false;
                  return tag;
              });
              resolve(this.tags);
          }

      });
  }


}
