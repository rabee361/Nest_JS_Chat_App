import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';



@Injectable()
export class AuthService {

    constructor(
        private database: DatabaseService,
        private jwtService: JwtService,
    ) {}

    async signUp(signupDto: SignUpDto) {
        let {username , password1 ,password2 , email ,image} = signupDto;
        if (password1 === password2) {
            
            const hashed = await bcrypt.hash(password1,2);
            
            const user = await this.database.user.create({
                data: {username: username , password: hashed , email: email , image:image}
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
                
            const isMatch = await bcrypt.compare(password ,user.password)
            
            if (!isMatch) {
                throw new HttpException('wrong password' , HttpStatus.BAD_REQUEST)
            }
            user['token'] = this.jwtService.sign(user)
            return user;

        }
        catch {
            throw new HttpException('email does not exist', HttpStatus.BAD_REQUEST)
        }
    }
}
