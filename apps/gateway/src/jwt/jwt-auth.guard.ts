import {ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../../../common/decorators/public-decorator";
import {Observable} from "rxjs";

@Injectable()
// AuthGuard('jwt'): passport-jwt 사용. 해당 전략은 jwt.strategy.ts에 설정
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (isPublic) return true;
        return super.canActivate(context);
    }
}