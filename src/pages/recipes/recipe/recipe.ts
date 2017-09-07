import { ShoppingListService } from './../../../services/shopping-list.service';
import { NewRecipePage } from './../new-recipe/new-recipe';
import { RecipesService } from './../../../services/recipes.service';
import { NavParams, NavController } from 'ionic-angular';
import { Recipe } from './../../../models/recipe';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'page-recipe',
  templateUrl: './recipe.html'
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor (private navParams: NavParams,
    private recipesService: RecipesService,
    private navCtrl: NavController,
    private slService: ShoppingListService
  ) {}

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.recipe = this.recipesService.getRecipes()[this.index];
  }

  onEditRecipe() {
    this.navCtrl.push(NewRecipePage, {
      recipe: this.recipe,
      index: this.index,
      mode: 'Edit'
    })
  }

  onAddIngredients() {
    this.slService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
