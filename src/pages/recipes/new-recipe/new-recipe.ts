import { Recipe } from './../../../models/recipe';
import { RecipesService } from './../../../services/recipes.service';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";


@Component({
  selector: 'page-new-recipe',
  templateUrl: './new-recipe.html'
})
export class NewRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  index: number;
  recipe: Recipe;

  constructor(private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService,
    private navCtrl: NavController
  ){}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let item of this.recipe.ingredients) {
        ingredients.push(new FormGroup({
          'name': new FormControl(item.name, Validators.required),
          'amount': new FormControl(item.amount, Validators.required)
        }))
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const length = fArray.length;
            if (length > 0) {
              for (let i = length -1; i >=0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All ingredients were deleted.',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'amount',
          placeholder: 'Amount',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null || data.amount == null || data.amount == '') {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(
              new FormGroup({
                'name': new FormControl(data.name, Validators.required),
                'amount': new FormControl(data.amount, Validators.required)
              })
            );
            const toast = this.toastCtrl.create({
              message: 'Item added!',
              duration: 1500,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  }
  onSubmit() {
    const value = this.recipeForm.value;
    // let ingredients = [];
    // if (value.ingredients.length > 0) {
    //   ingredients = value.ingredients.map( name => {
    //     return { name: name, amount: 1};
    //   });
    // }
    if (this.mode == 'New') {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, value.ingredients);
    }
    else {
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, value.ingredients);
    }
    this.recipeForm.reset(); // optional
    this.navCtrl.popToRoot();
  }
}
