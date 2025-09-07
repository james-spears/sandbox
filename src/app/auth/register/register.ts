import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Logo } from '@/app/_common/logo/logo';
import { AuthService } from '@/app/auth/auth-service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink, Logo, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  authService = inject(AuthService);
  formGroup = inject(FormBuilder).group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  router = inject(Router);

  handleSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.authService
      .emailPasswordSignUp(
        this.formGroup.controls.email.value!,
        this.formGroup.controls.password.value!,
      )
      .pipe(first())
      .subscribe((user) => {
        console.log(user);
        this.router.navigate(['../login']);
      });
  }
}
