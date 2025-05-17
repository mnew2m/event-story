import {Controller, Get, UseGuards} from '@nestjs/common';
import { GatewayService } from '../service/gateway.service';
import {JwtAuthGuard} from "../jwt/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";
import {UserRole} from "../../../auth/src/schema/user.schema";

@Controller('some-protected-route')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  // @Roles(UserRole.USER)
  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }
}
