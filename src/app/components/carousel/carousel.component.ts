import { Component, OnInit } from '@angular/core';

import { RecipesHttpService } from '../../services/recipes-http/recipes-http.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  recipeModal: any;
  ingredientsModal: any;
  imgSrc = "/assets/imgs/recipes/";

  constructor(public recipesHttpService: RecipesHttpService) { }

  ngOnInit() {
  }

  recipeModalFunc(carouselRecipeNumber: number) {
    this.getRecipeByCarouselNumber(carouselRecipeNumber).subscribe(data => {
      this.recipeModal = data[0];
    });
    this.getIngredientsByRecipe(carouselRecipeNumber).subscribe(data => {
      this.ingredientsModal = data;
    });
  }

  getRecipeByCarouselNumber(carouselRecipeNumber: number) {
    return this.recipesHttpService.getRecipe(carouselRecipeNumber);
  }

  getIngredientsByRecipe(recipeId: number) {
    return this.recipesHttpService.getIngredientsByRecipe(recipeId);
  }

}
