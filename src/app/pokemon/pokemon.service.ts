import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) { }

    addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)), 
      catchError((error) => this.handleError(error, null))
    );

  }
  
  // recherche per autoCompletion avec la librairie RXJS
  searchPokemonList(term: string): Observable<Pokemon[]> {
    // cette condition impose une saisi pour la recherche au moins à 2 lettres
    // pour ne pas soliciter inutilement le serveur.
    if(term.length <= 1) {
      return of([]);  
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)), 
      catchError((error) => this.handleError(error, [])) 
    );

  }
  getPokemonList() : Observable< Pokemon[]> {

    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      // tap((pokemonList) => console.table(pokemonList)), 
      tap((response) => this.log(response)), // code factorisé
      // catchError((error) => {     //////
      //   console.log(error);       //code factorisé
      //   return of([]);            
      // })
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number) : Observable<Pokemon|undefined> {

    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe (
      tap((response) => this.log(response)),
      // catchError((error) => {
      //   console.log(error);
      //   return of(undefined); // of permet d'emmettre un flux de donnée.
      // })
      catchError((error) => this.handleError(error, undefined))
    );

  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)), 
      catchError((error) => this.handleError(error, null))
    );

  }

  deletePokemonById(pokemonId: number) : Observable<null> {
    return this.http.delete<Pokemon>(`api/pokemons/${pokemonId}`).pipe (
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );

  }



  // methode de log pour eviter la redondance de code dans les methode CRUD
  private log(response: any) {
    console.table(response);
  }
  
  // methode "prendre une Erreur" pour eviter la redondance  de code dans les methode CRUD
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {

    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrick',
      'Poisson',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }

}
