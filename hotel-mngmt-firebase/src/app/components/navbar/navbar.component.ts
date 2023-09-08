import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { User } from "src/app/interfaces/user-interface";
import { AuthService } from "../auth/auth.service";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userData: User | null = null;
  subscriptions: Subscription[] = [];
  isSideBarOpen: boolean = false;
  users: User[] = [];

  constructor(private authService: AuthService) {}
  @ViewChild("sidenav") sidenav?: MatSidenav;

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }),
      this.authService.userData$.subscribe((userData) => {
        this.userData = userData;
      }),
      this.authService.getAllUsers().subscribe((users) => {
        this.users = users;
        console.log(users);
      })
    );
  }

  toggleSidebar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  changeToAdmin(user: User) {
    this.authService.makeAdmin(user);
  }

  changeToUser(user: User) {
    this.authService.makeRegularUser(user);
  }

  logout() {
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
