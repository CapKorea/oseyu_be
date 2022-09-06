import { Controller, Param, Body, Post, Res, Req, Get, Delete, UseGuards  } from '@nestjs/common';
import { RecruitDTO } from './dto/recruit.dto';
import { RecruitService } from './recruit.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Recruitment } from '../domain/recruit.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Logger } from '@nestjs/common/services';
import { User } from 'src/domain/user.entity';
import { Response } from 'express';

@Controller('recruit')
@UseGuards(AuthGuard())
export class RecruitController {
    private logger = new Logger('Recruitment');
    constructor(private recruitService:RecruitService){}

    // 새로운 구인글 등록
    @Post('/new')
    async newPost(
        @Req() req:Request, @Body() recruitDTO: RecruitDTO,
        @GetUser() user: User
        ): Promise<RecruitDTO>{
            this.logger.verbose(`유저 ${user.name} 이 새로운 구인글을 등록하였습니다.
            Payload: ${JSON.stringify(recruitDTO)}`);
                      
            return await this.recruitService.createPost(recruitDTO, user);
        }
    
    // 모든 구인글 목록 가져오기
    @Get('/recruitment-lists')
    async getAllPosts(): Promise<Recruitment[]>{
        return this.recruitService.getAllPosts();
       
    }

    // ID로 구인글 가져오기
    @Get('/:post_id')
    getPostById(@Param('post_id') post_id:number) : Promise<Recruitment>{
        return this.recruitService.getPostById(post_id);
    }

    // ID로 구인글 삭제하기
    @Delete('/:post_id')
    deleteBoard(@Param('post_id') post_id:number,
    @GetUser() user: User
    ): Promise<void>{
        this.logger.verbose(`유저 ${user.name}이 ID(${post_id})를 삭제합니다.`);
        return this.recruitService.deletePost(post_id, user);
    }
}
