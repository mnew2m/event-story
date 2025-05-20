export interface JwtPayload {
    sub: string; // 사용자ID
    username: string; // 사용자이름
    role: string; // 사용자역할
}