import { Distirct } from "../../domain/recruit.entity";

export class RecruitDTO{
    work_name: string;
    image: string;
    address: string;
    detailed_address: string;
    district: Distirct;
    start_date: Date;
    end_date: Date;
    start_time: number;
    end_time: number;
    days_of_work: number;
    num_of_people: number;
    daily_wage: number;
    recommended_lodging: string;
    meals_offered: boolean;
    trans_offered: boolean;
    contents: string;
    tags: string;
}