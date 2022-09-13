import { IsDate, IsString } from "@nestjs/class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recruitment } from "src/domain/recruit.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  user_id: string;

  @Column()
  password: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  phone: string;

  @Column("text", { nullable: true, default: null })
  @IsString()
  image: string;

  @Column({ type: "timestamp", nullable: true, default: null })
  @IsDate()
  user_created: Date;

  @Column({ type: "timestamp", nullable: true, default: null })
  @IsDate()
  user_updated: Date;

  @OneToMany((type) => Recruitment, (recruitment) => recruitment.user, {
    eager: true,
  })
  recruits: Recruitment[];
}
