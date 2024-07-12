import { Injectable } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor() {}

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = name == "Gamer" && password == "Gamer";

    return of(isLoggedIn).pipe(
      delay(1000), // pour simuler un delai de serveur
      tap((isLoggedIn) => (this.isLoggedIn = isLoggedIn)) // met à jour IsloggedIn
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
