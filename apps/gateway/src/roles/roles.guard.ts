import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles.decorator";
import {Observable} from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('ROLES_KEY: ', ROLES_KEY);
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        const { user } = context.switchToHttp().getRequest();

        console.log('🔥 RolesGuard 🔥');
        console.log('RequiredRoles: ', requiredRoles);
        console.log('User role: ', user?.role);

        if (!requiredRoles) return true; // 역할 제한이 없는 경우

        return requiredRoles.includes(user?.role);
    }
}