import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AboutComponent } from './about/about.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

//Services
import { RecipesHttpService } from './services/recipes-http/recipes-http.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'recipe-detail',
    component: RecipeDetailComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    RecipesComponent,
    AboutComponent,
    RecipeDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [RecipesHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
