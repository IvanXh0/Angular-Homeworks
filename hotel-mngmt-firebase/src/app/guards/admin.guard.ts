import { Injectable } from "@angular/core";
import { AuthService } from "../components/auth/auth.service";
import { Router, UrlTree } from "@angular/router";
import { Observable, map, pipe, take, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class AdminGuard {
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.authService.userData$.pipe(
      take(1),
      map((user) => !!user?.roles?.["admin"]),
      tap(
        (isAdmin) =>
          !isAdmin &&
          this.snackbar.open("Insufficient permissions", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          })
      )
    );
  }
}
