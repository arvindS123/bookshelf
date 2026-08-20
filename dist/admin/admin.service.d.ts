import { JwtService } from '@nestjs/jwt';
export declare class AdminService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private readonly admin;
    login(username: string, password: string): Promise<{
        username: string;
        token: string;
    }>;
}
