import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "appointment" })
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  appointmentId: number;

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
}
