import { IsNotEmpty, IsString } from "class-validator";


export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    password1: string
    
    @IsString()
    @IsNotEmpty()
    password2: string
    
}