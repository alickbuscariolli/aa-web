import { TestBed, inject } from '@angular/core/testing';

import { RecipesHttpService } from './recipes-http.service';

describe('RecipesHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipesHttpService]
    });
  });

  it('should be created', inject([RecipesHttpService], (service: RecipesHttpService) => {
    expect(service).toBeTruthy();
  }));
});
