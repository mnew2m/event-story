import {Document, Schema} from "mongoose";
import * as bcrypt from 'bcrypt';
import {UserRole} from "../../../../common/enums/auth.enum";

export const USER_MODEL_NAME = 'User';

export interface User extends Document {
  readonly id: string;
  readonly username: string;
  password: string;
  readonly role: UserRole;
  comparePassword: (candidatePassword: string) => Promise<boolean>; // 비밀번호 비교 메서드
}

export const UserSchema = new Schema<User>(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: UserRole, default: UserRole.USER},
  },
  {timestamps: true},
);

// 사용자 생성 시 비밀번호 해싱
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// 비밀번호 비교 메서드
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password); // 해시된 비밀번호 비교
}