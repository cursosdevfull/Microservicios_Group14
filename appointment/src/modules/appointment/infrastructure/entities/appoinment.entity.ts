import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "appointment" })
export class AppointmentEntity {
  @PrimaryColumn()
  appointmentId: string;

  @Column({ type: "varchar", length: 2 })
  countryIso: string;

  @Column()
  patientId: number;

  @Column()
  medicId: number;

  @Column()
  scheduleId: number;

  @Column()
  centerId: number;

  @Column()
  status: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
