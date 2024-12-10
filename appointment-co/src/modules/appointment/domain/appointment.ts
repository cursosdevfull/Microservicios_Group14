import { v4 as uuidv4 } from "uuid";

export type COUNTRY_ISO = "PE" | "CO" | "MX";
export type STATUS = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type AppointmentRequired = {
  countryIso: COUNTRY_ISO;
  patientId: number;
  medicId: number;
  scheduleId: number;
  centerId: number;
};

export type AppointmentOptional = {
  appointmentId: string;
  status: STATUS;
  createdAt: Date;
};

export type AppointmentProps = AppointmentRequired &
  Partial<AppointmentOptional>;

export class Appointment {
  private readonly appointmentId: string;
  private countryIso: COUNTRY_ISO;
  private patientId: number;
  private medicId: number;
  private scheduleId: number;
  private centerId: number;
  private status: STATUS;
  private createdAt: Date;

  constructor(props: AppointmentProps) {
    if (props.appointmentId) {
      this.appointmentId = props.appointmentId;
    } else {
      this.appointmentId = uuidv4();
    }

    if (!["PE", "CO", "MX"].includes(props.countryIso)) {
      throw new Error("Invalid country ISO");
    }

    if (props.patientId < 1) {
      throw new Error("Invalid patient ID");
    }

    if (props.medicId < 1) {
      throw new Error("Invalid medic ID");
    }

    if (props.scheduleId < 1) {
      throw new Error("Invalid schedule ID");
    }

    if (props.centerId < 1) {
      throw new Error("Invalid center ID");
    }

    if (
      props.status &&
      !["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"].includes(props.status)
    ) {
      throw new Error("Invalid status");
    }

    this.countryIso = props.countryIso;
    this.patientId = props.patientId;
    this.medicId = props.medicId;
    this.scheduleId = props.scheduleId;
    this.centerId = props.centerId;

    if (!props.status) {
      this.status = "PENDING";
    } else {
      this.status = props.status;
    }

    if (!props.createdAt) {
      this.createdAt = new Date();
    }
  }

  properties() {
    return {
      appointmentId: this.appointmentId,
      countryIso: this.countryIso,
      patientId: this.patientId,
      medicId: this.medicId,
      scheduleId: this.scheduleId,
      centerId: this.centerId,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
