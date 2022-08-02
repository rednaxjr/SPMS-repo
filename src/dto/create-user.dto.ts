import * as bcrypt from 'bcrypt'

export class CreateUserDto{
    fname:string;

    lname:string;

    username:string;

    password:string;
}