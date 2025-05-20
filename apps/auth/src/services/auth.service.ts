import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {User, USER_MODEL_NAME} from "../schemas/user.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateUserDto} from "../dto/create-user.dto";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "../dto/login.dto";
import {UserRole} from "../../../../common/enums/auth.enum";

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(USER_MODEL_NAME) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {username, password, role} = createUserDto;

    const checkUser = await this.userModel.findOne({username}).exec();
    if (checkUser) throw new ConflictException('Username already exists');

    const user = new this.userModel({
      username,
      password,
      role: role || UserRole.USER,
    });

    return user.save();
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const {username, password} = loginDto;

    // 사용자 조회
    const user = await this.findOneByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // 비밀번호 비교
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // JWT 토큰 생성
    const payload = {sub: user.id, username: user.username, role: user.role};
    const access_token = this.jwtService.sign(payload); // 토큰 생성

    return {access_token};
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({username}).exec();
  }
}
