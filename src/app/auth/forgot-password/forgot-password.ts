import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../_common/logo/logo';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, Logo],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {}
