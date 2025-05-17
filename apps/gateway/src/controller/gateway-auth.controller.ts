import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { GatewayService } from '../service/gateway.service';
import {JwtAuthGuard} from "../jwt/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";
import {User, UserRole} from "../../../auth/src/schema/user.schema";
import {HttpService} from "@nestjs/axios";
import {Public} from "../../../common/decorators/public-decorator";
import {LoginDto} from "../../../auth/src/dto/login.dto";
import {firstValueFrom} from "rxjs";
import {CreateUserDto} from "../../../../libs/dto/create-user.dto";

const AUTH_BASE_URL = 'http://auth:4001/auth';

@Controller('auth')
@UseGuards(RolesGuard)
export class GatewayController {
    constructor(private readonly http: HttpService) {}

    @Public()
    @Post('create-user')
    async createUser(@Body() body: CreateUserDto): Promise<User> {
        const { data } = await firstValueFrom(
            this.http.post(`${AUTH_BASE_URL}/create-user`, body)
        );
        return data;
    }

    @Public()
    @Post('login')
    async login(@Body() body: LoginDto) {
        const { data } = await firstValueFrom(
            this.http.post(`${AUTH_BASE_URL}/login`, body)
        );
        return data;
    }
}
