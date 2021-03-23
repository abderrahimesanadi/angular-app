import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logIn',
    templateUrl: './logIn.component.html',
    styleUrls: ['./logIn.component.scss']
})
export class LogInComponent implements OnInit {

    public signinForm: FormGroup;
    public error: string;

    constructor(
        public fb: FormBuilder,
        public auth: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initForm();
    }


    initForm() {
        this.signinForm = this.fb.group({

            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            keepConnected: [true]
        });
    }

    public onValidSigninForm(): void {
        this.auth.signin(this.signinForm.value).subscribe((status: string) => {
            this.router.navigate(['/article']);
        }, err => {

        });
    }

}
