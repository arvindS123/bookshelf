import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // Pre-generated hash for password: admin123
  private readonly admin = {
    id: 'admin-001',
    username: 'admin',
    passwordHash: '$2b$10$rQZ5K5Y5Y5Y5Y5Y5Y5Y5YuG8qJzqKzqKzqKzqKzqKzqKzqKzqKzqK', // we will fix this
  };

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit() {
    // Generate real hash when the module starts
    this.admin.passwordHash = await bcrypt.hash('admin123', 10);
    console.log('Admin password hash ready');
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (username !== this.admin.username) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, this.admin.passwordHash);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: this.admin.id,
      username: this.admin.username,
      role: 'admin',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: this.admin.id,
        username: this.admin.username,
        role: 'admin',
      },
    };
  }

  async validateUser(payload: any) {
    if (payload.username === this.admin.username) {
      return {
        id: this.admin.id,
        username: this.admin.username,
        role: 'admin',
      };
    }
    return null;
  }
}