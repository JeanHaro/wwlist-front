import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'auth-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

}
