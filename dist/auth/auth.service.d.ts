import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly admin;
    constructor(jwtService: JwtService);
    onModuleInit(): Promise<void>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            role: string;
        };
    }>;
    validateUser(payload: any): Promise<{
        id: string;
        username: string;
        role: string;
    } | null>;
}
