import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Logo } from '@/app/_common/logo/logo';
import { AuthService } from '@/app/auth/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Logo, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
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
      .emailPasswordLogin(
        this.formGroup.controls.email.value!,
        this.formGroup.controls.password.value!,
      )
      .pipe(first())
      .subscribe((user) => {
        console.log(user);
        this.router.navigate(['/dashboard']);
      });
  }
}
