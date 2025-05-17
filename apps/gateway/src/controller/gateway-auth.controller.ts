import {Body, Controller, Post} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Public} from "../../../common/decorators/public-decorator";
import {LoginDto} from "../../../auth/src/dto/login.dto";
import {firstValueFrom} from "rxjs";
import {CreateUserDto} from "../../../../libs/dto/create-user.dto";

const AUTH_BASE_URL = 'http://auth:4001/auth';

@Controller('auth')
export class GatewayAuthController {
  constructor(private readonly http: HttpService) {
  }

  @Public()
  @Post('create-user')
  async createUser(@Body() body: CreateUserDto) {
    const {data} = await firstValueFrom(
      this.http.post(`${AUTH_BASE_URL}/create-user`, body)
    );
    return data;
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    const {data} = await firstValueFrom(
      this.http.post(`${AUTH_BASE_URL}/login`, body)
    );
    return data;
  }
}
