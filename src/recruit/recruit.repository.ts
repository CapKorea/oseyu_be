import { CustomRepository } from "src/db/typeorm-ex.module";
import { Repository } from "typeorm";
import { RecruitDTO } from "./dto/recruit.dto";
import { Recruitment } from "../domain/recruit.entity";
import { User } from "src/domain/user.entity";

@CustomRepository(Recruitment)
export class RecruitRepository extends Repository<Recruitment>{
    async createPost(recruitDTO:RecruitDTO, user: User) : Promise<Recruitment>{
        const {
            work_name,
            image,
            address,
            detailed_address,
            district,
            start_date,
            end_date,
            start_time,
            end_time,
            days_of_work,
            num_of_people,
            daily_wage,
            recommended_lodging,
            meals_offered,
            trans_offered,
            contents,
            tags,
        } = recruitDTO;

        const post = this.create({
            work_name,
            image,
            address,
            detailed_address,
            district,
            start_date,
            end_date,
            start_time,
            end_time,
            days_of_work,
            num_of_people,
            daily_wage,
            recommended_lodging,
            meals_offered,
            trans_offered,
            contents,
            tags,
            user
        })

    await this.save(post);
    return post;
    }
}
