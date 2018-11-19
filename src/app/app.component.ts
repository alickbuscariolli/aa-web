import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Routes, RouterModule } from '@angular/router';

import { RecipesHttpService } from './services/recipes-http/recipes-http.service';
import { RecipesComponent } from './recipes/recipes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: any[];

  constructor(public recipesHttpService: RecipesHttpService) {}

}
