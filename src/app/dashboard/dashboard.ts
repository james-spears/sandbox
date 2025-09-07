import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, RouterModule } from '@angular/router';
import { Icon } from '../_common/logo/icon/icon';
import { first, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon, AsyncPipe, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {
  teams$: Observable<{ name: string }[]> = of([{ name: 'My Team' }]);
  authService = inject(AuthService);
  router = inject(Router);

  handleLogout() {
    this.authService
      .logout()
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['./']);
      });
  }
}
