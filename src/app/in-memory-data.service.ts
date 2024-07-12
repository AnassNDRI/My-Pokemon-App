import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Observable } from 'rxjs';
import { POKEMONS } from './pokemon/mock-pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  // cette va simuler le fait d'avoir des données venant du serveur
  createDb() {
   const pokemons = POKEMONS;
    return {pokemons}

  }
}
