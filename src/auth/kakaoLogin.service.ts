import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import axios from "axios";
import qs from "qs";

@Injectable()
export class KakaoLoginService{
        // 'https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3D%257Bhttps%253A%252F%252Flocalhost%253A3000%252Fauth%252Fkakaoallback%257D%26through_account%3Dtrue%26client_id%3D%257B9542782f1fb450919e22ecf36da4e5af%257D'
    async kakaoLogin(): Promise<any> {
        const kakaoKey = '9542782f1fb450919e22ecf36da4e5af'; // rest api key
        const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
        const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
        const body = {
        grant_type: 'authorization_code',
        client_id: kakaoKey, // client_id
        redirect_uri: `https://localhost:3000/auth/kakaoallback`, // redirect_uri
        code : '%26redirect_uri%3D%257Bhttps%253A%252F%252Flocalhost%253A3000%252Fauth%252Fkakaoallback%257D%26through_account%3Dtrue%26client_id%3D%257B9542782f1fb450919e22ecf36da4e5af%257D' // response_type
        };
        const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        };
        try {
        const response = await axios({
            method: 'POST',
            url: kakaoTokenUrl,
            timeout: 30000,
            headers,
            data: qs.stringify(body),
        });
        if (response.status === 200) {
            console.log(`kakaoToken : ${JSON.stringify(response.data)}`);
            // Token 을 가져왔을 경우 사용자 정보 조회
            const headerUserInfo = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: 'Bearer ' + response.data.access_token,
            };
            console.log(`url : ${kakaoTokenUrl}`);
            console.log(`headers : ${JSON.stringify(headerUserInfo)}`);
            const responseUserInfo = await axios({
            method: 'GET',
            url: kakaoUserInfoUrl,
            timeout: 30000,
            headers: headerUserInfo,
            });
            console.log(`responseUserInfo.status : ${responseUserInfo.status}`);
            if (responseUserInfo.status === 200) {
            console.log(
                `kakaoUserInfo : ${JSON.stringify(responseUserInfo.data)}`,
            );
            return responseUserInfo.data;
            } else {
            throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }
        } catch (error) {
        console.log(error);
        throw new UnauthorizedException();
        }
    }
}