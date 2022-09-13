import { Distirct } from "../../domain/recruit.entity";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  work_name: string;

  @IsString()
  image: string;

  @IsString()
  address: string;

  @IsString()
  detailed_address: string;

  @IsString()
  district: Distirct;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsNumber()
  start_time: number;

  @IsNumber()
  end_time: number;

  @IsNumber()
  days_of_work: number;

  @IsNumber()
  num_of_people: number;

  @IsNumber()
  daily_wage: number;

  @IsString()
  recommended_lodging: string;

  @IsBoolean()
  meals_offered: boolean;

  @IsBoolean()
  trans_offered: boolean;

  @IsString()
  contents: string;

  @IsString()
  tags: string;
}
