export type Practitioner = {
  id: number;
  firstName: string;
  lastName: string;
  speciality: string;
};

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export type Appointment = {
  id: number;
  patientId: number;
  practitionerId: number;
  startDate: Date;
  endDate: Date;
};

export type Availability = {
  id: number;
  practitionerId: number;
  startDate: Date;
  endDate: Date;
};

export type Timeslot = {
  id: number;
  practitionerId: number;
  startDate: Date;
  endDate: Date;
};
