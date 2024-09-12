import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('sign-up')
    signUp(@Body() signupDto: SignUpDto) {
        return this.authService.signUp(signupDto)
    }
    
    @Post('login')
    logIn(@Body() loginDto: LoginDto) {
        return this.authService.logIn(loginDto)
    }
}
