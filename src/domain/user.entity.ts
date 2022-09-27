import { IsDate, IsNumber, IsString, IsEmail } from "@nestjs/class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recruitment } from "src/domain/recruit.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: "bigint" })
  @IsNumber()
  kakaoId: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail({ unique: true })
  email: string;

  @Column({
    type: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  @IsDate()
  user_created: Date;

  @Column({
    type: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  @IsDate()
  user_updated: Date;

  @OneToMany((type) => Recruitment, (recruitment) => recruitment.user, {
    eager: true,
  })
  recruits: Recruitment[];
}
