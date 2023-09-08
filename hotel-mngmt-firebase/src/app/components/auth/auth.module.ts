import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  providers: [AuthService],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuthModule {}
