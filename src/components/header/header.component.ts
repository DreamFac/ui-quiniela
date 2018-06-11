import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
} )
export class HeaderComponent {
  title = 'RUSSIA 2018'
  constructor(public authService: AuthService){}
}
