import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {UserRole} from "../../apps/auth/src/schema/user.schema";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}