import {Controller, Get} from '@nestjs/common';
import {GatewayService} from '../service/gateway.service';

@Controller('some-protected-route')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }
}
