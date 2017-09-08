import { DatabaseOptionsPage } from './../pages/database-options/database-options';
import { AuthService } from './../services/auth.service';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { RecipesService } from './../services/recipes.service';
import { ShoppingListService } from './../services/shopping-list.service';
import { RecipePage } from './../pages/recipes/recipe/recipe';
import { NewRecipePage } from './../pages/recipes/new-recipe/new-recipe';
import { RecipesPage } from './../pages/recipes/recipes';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { TabsPage } from './../pages/tabs/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,
    NewRecipePage,
    RecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,
    NewRecipePage,
    RecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipesService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
