import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  shoppingList: Ingredient[];
  constructor(public navCtrl: NavController,
    private slService: ShoppingListService) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }
  onAddItem(form: NgForm) {
    this.slService.addItem(form.value['name'], form.value['amount']);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.shoppingList = this.slService.getItems();
  }
}
