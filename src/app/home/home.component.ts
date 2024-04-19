import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  vehicleForm: FormGroup;
  inputLabel: string = "Placas";

  constructor(private fb: FormBuilder, private router: Router) {
    this.vehicleForm = this.fb.group({
      inputField: ['', [Validators.required,
      Validators.pattern(/^[a-zA-Z]{3}-?\d{3}-?[a-zA-Z]$/)
    ]],
      inputType: ['placas']
    });

    this.vehicleForm.get('inputType')!.valueChanges.subscribe(value => {
      if (value === 'vin') {
        this.inputLabel = "VIN";
        this.vehicleForm.get('inputField')!.setValidators([Validators.required, Validators.pattern(/^[0-9A-Z]{17}$/)]);
        this.vehicleForm.get('inputField')!.updateValueAndValidity();
      } else {
        this.inputLabel = "Placas";
        this.vehicleForm.get('inputField')!.setValidators([Validators.required,
        Validators.pattern(/^[a-zA-Z]{3}-?\d{3}-?[a-zA-Z]$/)
      ]);
        this.vehicleForm.get('inputField')!.updateValueAndValidity();
      }
    });
  }

  search() {
    if (this.vehicleForm.valid) {
      console.log('Form Data:', this.vehicleForm.value);
      this.router.navigate(['/infraction']);
    }
  }

  onInputChange() {
    this.vehicleForm.get('inputField')!.setValue('');
  }
}
