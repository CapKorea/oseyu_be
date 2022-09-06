import { IsDate, IsString } from "@nestjs/class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User{
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

    @Column('text', {nullable:true, default:null})
    @IsString()
    image: string;

    @Column({type:"timestamp", nullable:true, default:null})
    @IsDate()
    user_created: Date;

    @Column({type:"timestamp", nullable:true, default:null})
    @IsDate()
    user_updated: Date;

    async validatePassword(password: string): Promise<boolean>{
        let isValid = await bcrypt.compare(password, this.password)
        return isValid;
    }
}
