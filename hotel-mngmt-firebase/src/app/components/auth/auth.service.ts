import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, mergeMap, of } from "rxjs";
import { User } from "src/app/interfaces/user-interface";

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
    private router: Router
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
        } satisfies User;

        await this.setUserData(userData);

        this.router.navigate(["/login"]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const result = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (result?.user) {
        this.router.navigate(["/management"]);
      }
    } catch (error) {
      console.log(error);
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
