export interface Appointment {
  id?: number;
  patientName: string;
  doctorName: string;
  startDate: Date;
  endDate: Date;
}