import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  
  /// lorsqu'on veut utiliser l'App-PokemonFormComponent 
  // (l'on veut editer ou afficher) => il faut passer une propriété d'entrée qui sera un un pokemon
  @Input() pokemon : Pokemon; // pokemon courant
  //////////////////////////////////////////////////////////////////////////
  types: string[];

  IsAddForm: boolean;// cette propriété permet de verifier si l'utilisateur veut bien faire un ajout

 constructor( 
  private pokemonService : PokemonService,
  private route : Router
  ) {}

 ngOnInit() {
  // la liste de tous les pokemons
  this.types = this.pokemonService.getPokemonTypeList();
  this.IsAddForm = this.route.url.includes('pokemon/add');

 }

 hasType(type: string): boolean {

  // verifie si  le pokemon a le type passer en paramètre ? ("includes" est une methode JavaScript)
  return this.pokemon.types.includes(type);
 }

  ///// selection si le type existe, sinon il decoche le type selectionné
  //// Paramètre ($event: Event, type: string) => ecoute pour savoir si 
  // l'utilisateur a coché ou décoché la checkbox  et egalement savoir le type ccoché/décoché
 selectType($event: Event, type: string) {
  //verifie si l'utilisateur a coché ou non la checkbox
  const isChecked: boolean =($event.target as HTMLInputElement).checked;
  if(isChecked) {
    this.pokemon.types.push(type);
  } else {
    ///sinon on recherche l'index du type coché 
    // avec la methode indexOf() de Angular.
    const index = this.pokemon.types.indexOf(type);
    ///après modifier le tableau pour le retirer
    this.pokemon.types.splice(index, 1); // supprime 1 élément à partir de l'"index"
  }

 }

 isTypesValid(type: string): boolean {

  /// si le pokemon à un seul type et que l'on travaille sur le type courant on lui bloque sa
  // checkbox
  if(this.pokemon.types.length == 1 && this.hasType(type)) {
     return false;
  }

  if(this.pokemon.types.length > 2 && !this.hasType(type)) {
    return false;
 }


  return true;
 }

 // lorsque l'utilisateur soumet le formulaire

 onSubmit() {
  if(this.IsAddForm) {
    this.pokemonService.addPokemon(this.pokemon)
    .subscribe((pokemon: Pokemon)=>
        this.route.navigate(['/pokemon', pokemon.id]));
  } else {
   
  this.pokemonService.updatePokemon(this.pokemon)
  .subscribe(()=>
      this.route.navigate(['/pokemon', this.pokemon.id]));
  }
 }
}
