import {Body, Controller, Get, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {User} from "./schema/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";
import {Public} from "../../common/decorators/public-decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }
}
