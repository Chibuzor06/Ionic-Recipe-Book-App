import { RecipePage } from './recipe/recipe';
import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipes.service';
import { NewRecipePage } from './new-recipe/new-recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private recipesService: RecipesService
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
}
