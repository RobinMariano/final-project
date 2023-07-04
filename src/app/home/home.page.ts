/**import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

} **/
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('searchbar', {static: true}) searchbar:  ElementRef | null = null;
  results: string[] = [];
  showResults = false;
  data: string[] = [
    'Onion', 'Garlic', 'Salt', 'Pepper', 'Oyster Sauce', 'Potato', 'Cabbage', 'Carrots',
    'Egg', 'Butter'
  ];
  selectedIngredients: string[] = [];

  constructor(private elementRef: ElementRef) { }
  

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((item: string) =>
      item.toLowerCase().includes(query)
    );
    this.showResults = true;
  }

  selectResult(event: any, result: string) {
    event.stopPropagation();
    if (!this.selectedIngredients.includes(result)) {
      this.selectedIngredients.push(result);
    }
    this.showResults = false;
  }

    deleteIngredient(ingredient: string) {
      const index = this.selectedIngredients.indexOf(ingredient);
      if (index > -1) {
        this.selectedIngredients.splice(index, 1);
      }
    }

@HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const isClickedInside = this.searchbar?.nativeElement?.contains(event.target);
    if (!isClickedInside) {
      this.showResults = false;

    }
  }
}