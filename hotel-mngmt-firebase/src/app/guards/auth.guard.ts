import { Injectable } from "@angular/core";
import { AuthService } from "../components/auth/auth.service";
import { Router, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.authService.isLoggedIn$.pipe(
      tap(
        (isLoggedIn: boolean) => !isLoggedIn && this.router.navigate(["/login"])
      )
    );
  }
}
