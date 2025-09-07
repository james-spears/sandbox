import { Component } from '@angular/core';
import { Icon } from './icon/icon';

@Component({
  selector: 'app-logo',
  imports: [Icon],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {}
