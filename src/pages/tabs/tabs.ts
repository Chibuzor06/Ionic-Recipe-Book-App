import { RecipesPage } from './../recipes/recipes';
import { ShoppingListPage } from './../shopping-list/shopping-list';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  shoppingListPage = ShoppingListPage;
  recipesPage = RecipesPage;

}
