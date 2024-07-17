import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ProfilingService } from '../profiling.service';
import { Users } from './users.model';
import { identifierName } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  profile: FormGroup;
  updateProfile: FormGroup;
  customers: Users[] = [];
  selectedUser: {
    first_name: string;
    last_name: string;
    email_address: string;
    contact_number: string;
  };
  constructor(
    private profileService: ProfilingService,
    private fb: FormBuilder
  ) {
    this.profile = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      contact_number: [
        '',
        [Validators.required, this.contactNumberValidator()],
      ],
    });

    this.updateProfile = this.fb.group({
      id: [],
      update_first_name: ['', Validators.required],
      update_last_name: ['', Validators.required],
      update_email_address: ['', [Validators.required, Validators.email]],
      update_contact_number: [
        '',
        [Validators.required, this.contactNumberValidator()],
      ],
    });

    this.selectedUser = {
      first_name: '',
      last_name: '',
      email_address: '',
      contact_number: '',
    };
  }

  ngOnInit() {
    this.retrieveCustomers();
  }

  contactNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const isValid = /^09\d{9}$/.test(value);
      return isValid ? null : { invalidContactNumber: true };
    };
  }

  get contactNumber() {
    return this.profile.get('contact_number');
  }

  get updateContact() {
    return this.updateProfile.get('update_contact_number');
  }
  retrieveCustomers() {
    this.profileService.listCustomer().subscribe((res) => {
      this.customers = res;
    });
  }

  viewCustomer(id: number) {
    this.profileService.viewCustomer(id).subscribe((res) => {
      this.selectedUser = res;
    });
  }

  patchCustomer(
    selectedId: number,
    fname: string,
    lname: string,
    email: string,
    contact: string
  ) {
    this.updateProfile.patchValue({
      id: selectedId,
      update_first_name: fname,
      update_last_name: lname,
      update_email_address: email,
      update_contact_number: contact,
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'The user must be added again once deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.value) {
        this.profileService.deleteCustomer(id).subscribe((res) => {
          Swal.fire({
            title: 'Deleted the User!',
            icon: 'success',
            confirmButtonColor: '#34c38f',
          });
          this.retrieveCustomers();
        });
      }
    });
  }

  onUpdate() {
    if (this.updateProfile.valid) {
      this.profileService
        .updateCustomer(this.updateProfile.value)
        .subscribe((res) => {
          Swal.fire({
            title: 'Successfully Updated User!',
            icon: 'success',
            confirmButtonColor: '#34c38f',
          });
          this.updateProfile.reset();
          this.retrieveCustomers();
        });
    } else {
    }
  }
  onSubmit() {
    if (this.profile.valid) {
      this.profileService
        .createCustomer(this.profile.value)
        .subscribe((res) => {
          Swal.fire({
            title: 'Successfully Added User!',
            icon: 'success',
            confirmButtonColor: '#34c38f',
          });
          this.profile.reset();
          this.retrieveCustomers();
        });
    } else {
    }
  }
}
