import { DatabaseOptionsPage } from './../database-options/database-options';
import { AuthService } from './../../services/auth.service';
import { RecipePage } from './recipe/recipe';
import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipes.service';
import { NewRecipePage } from './new-recipe/new-recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, AlertController, LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(private navCtrl: NavController,
    private recipesService: RecipesService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController

  ) {}

  onNewRecipe() {
    this.navCtrl.push(NewRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }
  onLoadRecipe(index: number) {
    this.navCtrl.push(RecipePage, {
      index: index
    });
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({
      ev: event
    });
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.recipesService.fetchRecipes(token)
                .subscribe(
                  (list: Recipe[]) => {
                    loading.dismiss();
                    if (list) {
                      this.recipes = list;
                    } else {
                      this.recipes = [];
                    }
                  },
                  error => {
                    loading.dismiss();
                    console.log(error.statusText);
                    this.handleError(error.json().error);
                  }
                )
            }
          );
        } else if (data.action == 'store'){
          loading.present();
          this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.recipesService.storeRecipes(token)
                .subscribe(
                  () => {
                    console.log('Success!');
                    loading.dismiss();
                  },
                  error => {
                    loading.dismiss();
                    this.handleError(error.json().error);

                  }
                )
            }
          );
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
