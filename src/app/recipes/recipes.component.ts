import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RecipesHttpService } from '../services/recipes-http/recipes-http.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: any = [];
  imgSrc = "/assets/imgs/recipes/";
  recipeModal: any;
  ingredientsModal: any;

  ingredients: any = [];
  recipesIngredients: any = [];

  recipesBacking: any = [];
  recipesCondiments: any = [];
  recipesDairy: any = [];
  recipesFish: any = [];
  recipesFruits: any = [];
  recipesMeats: any = [];

  loadRecipesByIngredients: any = [];

  dataContent: any = [];

  constructor(public recipesHttpService: RecipesHttpService) { }

  ngOnInit() {
    this.recipesHttpService.getIngredients().subscribe(data => {
      this.ingredients = data;
      this.recipesBacking = this.ingredients.filter(d => d.category == "Baking and Grains");
      this.recipesCondiments = this.ingredients.filter(d => d.category == "Condiments and Seasoning");
      this.recipesDairy = this.ingredients.filter(d => d.category == "Dairy");
      this.recipesFish = this.ingredients.filter(d => d.category == "Fish and Seafood");
      this.recipesFruits = this.ingredients.filter(d => d.category == "Fruit and Vege");
      this.recipesMeats = this.ingredients.filter(d => d.category == "Meat");

      console.log(this.recipesCondiments);
      console.log(this.ingredients)
    })
  }
  
  loadRecipe(id) {
    this.recipesHttpService.getForeignKey(id).subscribe(data => {
      this.recipesHttpService.getRecipe(data[0].recipe_fk).subscribe(data => {
        this.recipes = data;
      });
    })
  }

  toggleCheckBox(id, i) {
    let test = this.ingredients.filter(i => i.id === id);
    test[0].toggle = !test[0].toggle;
    this.beginRecipe(id);
  }

  beginRecipe(id) {
    let selectedIngredients = this.ingredients.filter(i => i.toggle === true);
    this.recipes = [];
    if (selectedIngredients.length === 0) {
      this.recipes = [];
    } else {
      for (let i = 0; i < selectedIngredients.length; i++) {
        this.loadRecipesByIngredientId(selectedIngredients[i].id);
      }
    }
  }

  loadRecipesByIngredientId(id){
    this.recipesHttpService.getRecipesByIngredient(id).subscribe(data => {
      let selectedIngredients = this.ingredients.filter(i => i.toggle === true);
      this.loadRecipesByIngredients = data;
      for (let i = 0; i < this.loadRecipesByIngredients.length; i++) {
          if (this.loadRecipesByIngredients[0] != undefined) {
            this.recipesHttpService.getIngredientsByRecipe(this.loadRecipesByIngredients[i].recipe_fk).subscribe(data => {
              let a = 0;
              this.loadRecipesByIngredients = data;
              for(let i = 0; i < this.loadRecipesByIngredients.length; i++) {
                for (let j = 0; j < selectedIngredients.length; j++) {
                  if (selectedIngredients[j].id === this.loadRecipesByIngredients[i].ingredient_fk) {
                    a++;
                  }
                }
              }
              if(a === selectedIngredients.length) {
                let sameRecipeCheck = this.recipes.filter(r => r.recipe_fk === this.loadRecipesByIngredients[i].recipe_fk);
                if(sameRecipeCheck.length === 0){
                  this.recipes.push(this.loadRecipesByIngredients[i]);
                }
              }
            });
          }
      }
    });
  }

  recipeModalFunc(recipe:any, id: number) {
    this.recipeModal = recipe;
    this.getIngredientsByRecipe(id).subscribe(data => {
      this.ingredientsModal = data;
    });
  }

  getIngredientsByRecipe(recipeId: number) {
    return this.recipesHttpService.getIngredientsByRecipe(recipeId);
  }

}
