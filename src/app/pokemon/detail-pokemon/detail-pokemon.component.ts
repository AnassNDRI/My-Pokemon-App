import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  
})
export class DetailPokemonComponent implements OnInit {


  pokemonList: Pokemon [];
  pokemon: Pokemon | undefined;
  constructor (
      private routeActive: ActivatedRoute,
      private route: Router ,
      private pokemonService : PokemonService
    ){}

  ngOnInit() {

    const pokemonId: string|null = this.routeActive.snapshot.paramMap.get('id');

    if(pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
      .subscribe(pokemon => this.pokemon = pokemon);
    } 
    
  }
  
  deletePokemon(pokemon: Pokemon) {
    alert(`Voulez-vous vraiment suppprimer ${pokemon.name} ?`);
    this.pokemonService.deletePokemonById(pokemon.id)
    .subscribe(() => this.goBack());
  }
  goBack() {
    this.route.navigate(['/pokemons'])
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.route.navigate(['/edit/pokemon', pokemon.id]);
  }

}
