import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  authForm = new FormGroup({
    name: new FormControl<string>("", Validators.required),
    email: new FormControl<string>(
      "",
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl<string>("", Validators.required),
  });

  constructor(private authService: AuthService) {}

  showLoginForm: boolean = true;
  hidePassword: boolean = true;
  loading: boolean = false;

  onSubmit(): void {
    const { name, email, password } = this.authForm.value;

    if (!this.showLoginForm) {
      if (!email || !password || !name) {
        return;
      }

      this.loading = true;
      this.authService.registerUser(email, password, name).finally(() => {
        this.loading = false;
      });
    } else {
      if (!email || !password) {
        return;
      }

      this.authService.loginUser(email, password);
    }
  }
}
