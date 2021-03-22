import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '../services/article.service';
import {Article} from '../models/article.model';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public editMode: boolean = false;
  public creationMode: boolean = false;
  public defaultMode: boolean = false;

  public idArticle = null;
  public currentArticle: Article = null;
  public articleProtected: boolean = false;
  public articleNotExist: boolean = false;
  public articleForm: FormGroup;


  constructor(
        public route: ActivatedRoute,
        public router: Router,
        public fb: FormBuilder,
        public article: ArticleService,
  ) { }

  ngOnInit(): void {
    /*this.article.getArticle(this.idArticle).subscribe((article: Article) => {


      this.currentArticle = article;
      this.processInitialisation();
    });*/

    this.route.paramMap.subscribe(params => {

      // Routing "interne"

      this.editMode = params.get('action') === 'edit' || params.get('id') === 'new';
      this.idArticle = params.get('id');

      this.defaultMode = false;
      this.articleProtected = false;


      // Download tag peut être "synchone" ou "asynchrone"
      // (suivant si les tags sont déja présents)

      this.article.retrieveTags().then(() => {

          this.creationMode = params.get('id') === 'new';

          if (!this.idArticle || (isNaN(this.idArticle) && !this.creationMode)) {

              this.defaultMode = true;

          } else {

              if (this.creationMode) {

                  this.initNewArticle();

              } else {

                  if (this.article.currentArticle && this.article.currentArticle.id == this.idArticle) {

                      this.currentArticle = this.article.currentArticle;
                      this.processInitialisation();

                  } else {

                      //
                      this.article.getArticle(this.idArticle).subscribe((article: Article) => {

                          if (article['status'] === 5) {

                              this.articleNotExist = true;
                              this.currentArticle = null;

                          } else if (article['status'] === 4) {

                              this.articleProtected = true;
                              this.currentArticle = null;

                          } else {

                              this.currentArticle = article;
                              this.processInitialisation();

                          }

                      });
                  }
              }

          }

      });
  });
  }

  private initTags() : void {
    this.currentArticle.Tag.forEach(tag => {
        this.article.tags.forEach(tag_ => {
            if (tag_['id'] == tag) {
                tag_['chosen'] = true;
            }
        });
    });
}


private processInitialisation() : void {

    //this.initTags();

    if (this.editMode) {
        this.initForm(this.currentArticle);
    }
}

private initForm(article: Article) : void {

  this.articleForm = this.fb.group({
      name: [article.name, [Validators.required]],
      content: [article.content],
      draft: [article.draft],
      selectTag: ['']
  });
}

private initNewArticle() : void {
  this.currentArticle = null;
  this.article.currentArticle = null;
  this.articleForm = this.fb.group({
      name: ['', [Validators.required]],
      content: [''],
      draft: [true],
      selectTag: ['']
  });
}

}
