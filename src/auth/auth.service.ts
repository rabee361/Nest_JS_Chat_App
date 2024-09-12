import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private database: DatabaseService , private jwtService: JwtService) {}

    async signUp(signupDto: SignUpDto) {
        let {username , password1 ,password2 , email} = signupDto;
        if (password1 === password2) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password1,salt);
            const user = await this.database.user.create({
                data: {username: username , password: hashed , email: email}
            })
            const { password, ...myuser} = user
            myuser['token'] = this.jwtService.sign(myuser)
            return myuser;
            }
        else {
            return new HttpException('error' , HttpStatus.BAD_REQUEST)
        }
    }

    async logIn(loginDto: LoginDto) {
        let { email , password } = loginDto;
        try {
            const user = await this.database.user.findUnique({
                where: {
                    email,
                }
            })
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password,salt)
            if (hashed !== user.password) {
                return new HttpException('wrong password' , HttpStatus.BAD_REQUEST)
            }

        }
        catch {
            return new HttpException('email does not exist', HttpStatus.BAD_REQUEST)
        }
    }
}
