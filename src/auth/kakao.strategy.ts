import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-kakao";
import { UserRepository } from "./user.repository";

export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      clientID: process.env.KAKAO_CLIENTID,
      callbackURL: process.env.KAKAO_CALLBACKURL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    const profileJson = profile._json;
    const kakao_account = profileJson.kakao_account;
    // const payload = {
    //   name: kakao_account.profile.nickname,
    //   kakaoId: profileJson.id,
    //   email:
    //     kakao_account.has_email && !kakao_account.email_needs_agreement
    //       ? kakao_account.email
    //       : null,
    // };

    try {
      const findUser = await this.userRepository.findOne({
        where: { kakaoId: profileJson.id },
      });

      if (findUser) {
        done(null, findUser);
      } else {
        const userInfo = {
          kakaoId: profileJson.id,
          name: kakao_account.profile.nickname,
          email:
            kakao_account.has_email && !kakao_account.email_needs_agreement
              ? kakao_account.email
              : null,
        };

        const createUser = await this.userRepository.create(userInfo);
        await this.userRepository.save(createUser);
        done(null, createUser);
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  }
}
