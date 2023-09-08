import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map, mergeMap, of, tap } from "rxjs";
import { Roles, User } from "src/app/interfaces/user-interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  private userData: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  userData$: Observable<User | null> = this.userData.asObservable();

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.fireAuth.authState
      .pipe(
        mergeMap((user) => {
          if (user) {
            return this.firestore
              .collection<User>("user")
              .doc(user.uid)
              .valueChanges();
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (user: User | null | undefined) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));

            this.updateIsLoggedIn(true);
            this.updateUserData(user);
          } else {
            localStorage.removeItem("user");
            this.updateIsLoggedIn(false);
            this.updateUserData(null);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  private updateIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

  private updateUserData(userData: User | null) {
    this.userData.next(userData);
  }

  getAllUsers() {
    return this.firestore.collection<User>("user").valueChanges();
  }

  async makeAdmin(user: User) {
    await this.firestore
      .collection("user")
      .doc(user.uid)
      .update({ roles: { admin: true } });

    this.snackbar.open("Successfully made admin", "Close", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  async makeRegularUser(user: User) {
    await this.firestore.collection("user").doc(user.uid).update({ roles: {} });

    this.snackbar.open("Successfully revoked admin", "Close", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  async registerUser(email: string, password: string, displayName?: string) {
    try {
      const result = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (result?.user) {
        await result.user.updateProfile({
          displayName,
        });

        const userData = {
          uid: result.user?.uid,
          displayName,
          email,
          roles: {},
        } satisfies User;

        await this.setUserData(userData);
        this.snackbar.open("Successfully registered", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });

        this.router.navigate(["/management"]);
      } else {
        this.snackbar.open("Failed to register", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      }
    } catch (error: any) {
      this.snackbar.open(error.message, "Close", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const result = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (result?.user) {
        this.router.navigate(["/"]);
        this.snackbar.open("Successfully logged in", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      } else {
        this.snackbar.open("Failed to login", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      }
    } catch (error: any) {
      this.snackbar.open(error.message, "Close", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    }
  }

  async logoutUser() {
    await this.fireAuth.signOut();
    localStorage.removeItem("user");
    this.updateIsLoggedIn(false);
    this.updateUserData(null);
    this.router.navigate(["/login"]);
    window.location.reload();
  }

  setUserData(user: User): Promise<void> {
    return this.firestore
      .collection("user")
      .doc(user.uid)
      .set(user, { merge: true });
  }
}
