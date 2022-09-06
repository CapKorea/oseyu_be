import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsDate, IsInt, IsString } from '@nestjs/class-validator';
import { User } from "./user.entity";

export enum Distirct{
    SEOUL = '서울',
    BUSAN = '부산',
    DAEGU = '대구',
    INCHEON = '인천',
    GWANGJU = '광주',
    DAEJEON = '대전',
    ULSAN = '울산',
    SEJONG = '세종',
    GYEONGGI = '경기',
    GANGWON = '강원',
    CHUNGBUK = '충청북도',
    CHUNGNAM = '충청남도',
    JEONNAM = '전라남도',
    JEONBUK = '전라북도',
    GYEONGBUK = '경상북도',
    GYEONGNAM = '경상남도',
    JEJU = '제주'
}

@Entity('recruitment')
export class Recruitment{
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column()
    @IsString()
    work_name: string;

    @Column()
    @IsString()
    image: string;

    @Column()
    @IsString()
    address: string;

    @Column()
    @IsString()
    detailed_address: string;

    @Column({
        type: 'enum',
        enum: Distirct,
        default: null
    })
    district: Distirct;
    
    @Column({type:'timestamp', nullable:true})
    @IsDate()
    start_date: Date;

    @Column({type:'timestamp', nullable:true})
    @IsDate()
    end_date: Date;

    @Column('smallint')
    @IsInt()
    start_time: number;

    @Column('smallint')
    @IsInt()
    end_time: number;

    @Column('smallint')
    @IsInt()
    days_of_work: number;

    @Column('smallint')
    @IsInt()
    num_of_people: number;

    @Column('int')
    daily_wage: number;

    @Column('bool', {default:false})
    @IsBoolean()
    lodging_offered: boolean;

    @Column({nullable:true})
    @IsString()
    recommended_lodging: string;

    @Column('bool', {default:false})
    @IsBoolean()
    meals_offered: boolean;

    @Column('bool', {default:false})
    @IsBoolean()
    trans_offered: boolean;

    @Column('text')
    @IsString()
    contents: string;

    @Column('text')
    @IsString()
    tags: string;

    @Column('bool', {default: false})
    @IsBoolean()
    is_closed: boolean;

    @ManyToOne(() => User, (user) => user.recruits, { eager:false })
    user: User
}
