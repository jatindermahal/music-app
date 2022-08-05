import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService) {}

  registerUser = { userName: '', password: '', password2: '' };
  warning = "";
  success = false;
  loading = false;


  onSubmit(){
    if(this.registerUser.userName && this.registerUser.password && this.registerUser.password2){
      this.loading = true;
      this.auth.register(this.registerUser).subscribe({
          next: (v) => {
            this.success = true;
            this.warning = "";
            this.loading = false;
          },
          error: (err) => {
            this.success = false;
            this.warning = err.error.message;
            this.loading = false;
          }
      });
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
      
  }
}
