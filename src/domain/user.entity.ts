import { IsDate, IsString } from "@nestjs/class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recruitment } from "src/domain/recruit.entity";
import { IsEmail } from "class-validator";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  kakaoId: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail({ unique: true })
  email: string;

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
