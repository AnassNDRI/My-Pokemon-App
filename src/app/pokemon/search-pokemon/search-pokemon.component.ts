import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {



  // On aura besoin de 2 propriétés qui sont:
  searchTerms = new Subject<string>(); // represente le flux de recherche de l'utilisateur. 
                   // la classe SUBJECT n'apartient paas à Angular mais RXJS

  //$ sur une variable est une convention qui indique un flux de données
  pokemons$: Observable<Pokemon[]>; // un observable qui represente le flux de Pokemons

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // methode "debounceTime()" de RXJS qui marque un temps avant de lancer la requete,
      debounceTime(200),
      //methode "debounceTime" de RXJSeliminer les requetes successives distinctes  
      distinctUntilChanged(),
      //methode "switchMap()" de RXJSeliminer va nous ramener directement la pokemonList du dernier 
            // "term" saisi par l'utilisateur  
      switchMap((term) => this.pokemonService.searchPokemonList(term))

    );
    
  }

  search(term: string) {
    this.searchTerms.next(term); // utiliser "searchTerms" pour pousser le term de recherche 
                                     //que l'utilisateur à tapé. 

  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
