import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {UserRole} from "../../../../common/enums/auth.enum";

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