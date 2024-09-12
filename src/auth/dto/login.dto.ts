import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


export class LoginDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    @IsString()
    password: string
}