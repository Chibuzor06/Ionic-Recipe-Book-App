import { AuthService } from './../../services/auth.service';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  shoppingList: Ingredient[];
  constructor(public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private slService: ShoppingListService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
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
              this.slService.fetchList(token)
                .subscribe(
                  (list: Ingredient[]) => {
                    loading.dismiss();
                    if (list) {
                      this.shoppingList = list;
                    } else {
                      this.shoppingList = [];
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
              this.slService.storeList(token)
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


