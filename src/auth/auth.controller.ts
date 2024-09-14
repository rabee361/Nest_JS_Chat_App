import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
          destination: './files',
          filename: function (req, file, cb) {
            cb(null, file.originalname)
          }
        }),
      }))
    signUp(@Body() signupDto: SignUpDto, @UploadedFile() file) {
        signupDto.image = 'http://localhost:3000/files/' + file?.originalname; // Update this to use the new filename
        return this.authService.signUp(signupDto)
    }
    
    @Post('login')
    logIn(@Body() loginDto: LoginDto) {
        return this.authService.logIn(loginDto)
    }
}
