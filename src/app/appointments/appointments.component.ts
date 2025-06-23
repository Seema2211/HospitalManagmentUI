import { Component } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../model/appointment.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;
@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})

export class AppointmentsComponent {
  appointments: Appointment[] = [];
  appointmentForm!: FormGroup;
  editing = false;
  selectedAppointmentId: number | null = null;
  toastMessage = '';
  showToast = false;
  minDate = new Date();


  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadAppointments();
  }

  initForm() {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      doctorName: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });
  }

  loadAppointments() {
    this.appointmentService.getAll().subscribe(data => {
      this.appointments = data;
    });
  }

  openAddModal() {
    this.editing = false;
    this.selectedAppointmentId = null;
    this.appointmentForm.reset();
    const modalEl = document.getElementById('appointmentModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  openEditModal(appointment: Appointment) {
    this.editing = true;
    this.selectedAppointmentId = appointment.id || null;
    this.appointmentForm.patchValue({ ...appointment });
    const modalEl = document.getElementById('appointmentModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  onSubmit() {
    if (this.appointmentForm.invalid) return;

    const formValue = this.appointmentForm.value;
    if (this.editing && this.selectedAppointmentId != null) {
      this.appointmentService.update(this.selectedAppointmentId, formValue).subscribe((res) => {
        if(res){    
          this.loadAppointments();
          this.closeModal();
          this.showSuccessToast('Appointment updated successfully!');
        }
        else{
          this.showSuccessToast('Appointment is already booked for same day!');
        }
    
      });
    } else {
      this.appointmentService.create(formValue).subscribe((res) => {
        if(res){  
        this.loadAppointments();
        this.closeModal();
        this.showSuccessToast('Appointment saved successfully!');}
        else{
          this.showSuccessToast('Appointment is already booked for same day!');
        }
      });
    }
  }

  deleteAppointment(id: number | undefined) {
    if (!id) return;
    this.appointmentService.delete(id).subscribe(() => {
      this.loadAppointments();
      this.showSuccessToast('Appointment deleted successfully!');
    });
  }

  closeModal() {
    const modalEl = document.getElementById('appointmentModal');
    if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  showSuccessToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
