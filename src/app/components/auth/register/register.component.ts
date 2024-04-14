import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.register(this.form.value).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }
}
