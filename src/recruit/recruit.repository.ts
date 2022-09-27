import { CustomRepository } from "src/db/typeorm-ex.module";
import { Repository } from "typeorm";
import { RecruitDTO } from "./dto/recruit.dto";
import { Recruitment } from "../domain/recruit.entity";
import { User } from "src/domain/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";

@CustomRepository(Recruitment)
export class RecruitRepository extends Repository<Recruitment> {
  async createPost(
    recruitDto: CreatePostDto,
    user: User
  ): Promise<Recruitment> {
    const post = this.create({ ...recruitDto, user });
    await this.save(post);
    return post;
  }
}
