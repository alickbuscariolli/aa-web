import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesHttpService {

  apiUrl = "http://localhost:3000/";

  constructor(public http: HttpClient) {}

  public getRecipes() {
    return this.http.get(this.apiUrl + 'recipes');
  }

  public addRecipe(title,
                  directions,
                  time,
                  ethnicity,
                  difficulty,
                  ingredients,
                  imgPath) {
    return this.http.post(this.apiUrl + 'items', {'title': title,
                                                 'directions': directions,
                                                 'time': time,
                                                 'ethnicity': ethnicity,
                                                 'difficulty': difficulty,
                                                 'ingredients': ingredients,
                                                 'imgPath': imgPath});
  }

  public getForeignKey(id) {
    return this.http.get(this.apiUrl + 'recipes/' + id);
  }

  public getRecipe(id) {
    return this.http.get(this.apiUrl + 'recipe/' + id);
  }

  //get recipes by ingredient
  public getRecipesByIngredient(id){
    return this.http.get(this.apiUrl + 'recipes/ingredients/' + id);
  }

  //get ingredients by recipe
  public getIngredientsByRecipe(id){
    return this.http.get(this.apiUrl + 'ingredients/' + id);
  }

  //get ingredients
  public getIngredients(){
    return this.http.get(this.apiUrl + 'ingredients');
  }

}
