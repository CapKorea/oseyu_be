import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecruitDTO } from './dto/recruit.dto';
import { Recruitment } from '../domain/recruit.entity';
import { RecruitRepository } from './recruit.repository';
import { User } from 'src/domain/user.entity';

@Injectable()
export class RecruitService {
    constructor(
        @InjectRepository(RecruitRepository)
        private recruitRepository:RecruitRepository,
    ){}

    // 신규 구인글 등록
    async createPost(recruitDTO: RecruitDTO, user: User): Promise<RecruitDTO | undefined>{
        return await this.recruitRepository.createPost(recruitDTO, user);
    }

    // 전체 구인글 목록 가져오기
    async getAllPosts():Promise<Recruitment[]>{
        return this.recruitRepository.find();
    }
 
    // ID로 구인글 객체 가져오기
    async getPostById(post_id): Promise<Recruitment>{
        const found = await this.recruitRepository.findOne({where: {post_id:post_id}});

        if(!found){
            throw new NotFoundException(`해당 게시글을 찾을 수 없습니다.`)
        }
        return found;
    }

    // 해당 ID 구인글 삭제
    async deletePost(post_id, user) : Promise<void> {
        const result = await this.recruitRepository.delete({post_id, user});

        if(result.affected === 0){
            throw new NotFoundException(`ID(${post_id})의 게시글을 찾을 수 없습니다.`);
        }
    }

    async example(): Promise<string>{
        return "example";
    }
}
