import { AuthService } from './auth.service';
import { Ingredient } from './../models/ingredient';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {

  constructor(private http: Http, private authService: AuthService) {}

  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }
  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }
  getItems() {
    return this.ingredients.slice();
  }
  removeItem(index: number) {
    // const index = this.ingredients.findIndex(
    //   (itemEl: Ingredient) => {
    //     return itemEl.name == item.name;
    //   });
      this.ingredients.splice(index, 1);
  }
  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://ionic-recipebook-d380e.firebaseio.com/' + userId +
      '/shopping-list.json?auth=' + token, this.ingredients)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-recipebook-d380e.firebaseio.com/' + userId +
    '/shopping-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((ingredients: Ingredient[]) => {
        if (ingredients){
          this.ingredients = ingredients;
        }else {

        }
      });
  }
}
