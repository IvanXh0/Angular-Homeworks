import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { User } from "src/app/interfaces/user-interface";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userData: User | null = null;
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }),
      this.authService.userData$.subscribe((userData) => {
        this.userData = userData;
      })
    );
  }

  logout() {
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
