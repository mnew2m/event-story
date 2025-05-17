import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthService} from "../../../auth/src/auth.service";
import {JwtPayload} from "./jwt-payload.interface";
import {configuration} from "../../../../config/configuration";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    const jwtSecret: string = configuration().JWT.SECRET!;
    if (!jwtSecret) throw new Error('JWT_SECRET is not defined');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: JwtPayload) {
    return await this.authService.findOneByUsername(payload.username);
  }
}