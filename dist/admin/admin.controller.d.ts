import { AdminService } from './admin.service';
import { LoginDto } from './dto/login.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    login(dto: LoginDto): Promise<{
        username: string;
        token: string;
    }>;
    me(req: any): {
        user: any;
    };
}
