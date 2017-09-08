import { Response } from '@angular/http';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
import 'rxjs/Rx';

@Injectable()
export class RecipesService {

  constructor(private http: Http, private authService: AuthService) {}

  private recipes: Recipe[] = [];

  addRecipe(title: string,
      description: string,
      difficulty: string,
      ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }
  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
  getRecipes() {
    return this.recipes.slice();
  }
  updateRecipe(index: number, title: string,
      description: string,
      difficulty: string,
      ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  storeRecipes(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://ionic-recipebook-d380e.firebaseio.com/' + userId +
      '/recipes.json?auth=' + token, this.recipes)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchRecipes(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-recipebook-d380e.firebaseio.com/' + userId +
    '/recipes.json?auth=' + token)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json() ? response.json() : [];
        for(let item of recipes) {
          if (!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }
        }
        return recipes;
      })
      .do((recipes: Recipe[]) => {
        if(recipes) {
          this.recipes = recipes;
        }else {

        }
      });
  }
}
