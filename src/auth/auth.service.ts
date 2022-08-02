import { BadRequestException, HttpException, HttpStatus, Injectable,Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

import { UserService } from 'src/user/user.service';
import { comparePass } from 'src/utilities/bcrypt';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository : Repository<User>,
        private usersService: UserService,
        private jwtService: JwtService
      ) {}
    
      async validateUser(user): Promise<any> {
        const userinfo = await this.usersService.findUser(user.email);
        console.log(userinfo)

        const isMatch = comparePass(userinfo.password,user.password);
        console.log(isMatch)
        if(userinfo){
            if(isMatch){
                
                const { password, ...result } = userinfo;
                

                return {
                    access_token: this.jwtService.sign(result),
                    userInfo:result,
                    
                }; 
                

            }else{
                return new HttpException("User not found", HttpStatus.REQUEST_TIMEOUT); 
            }
        }else{
            return new HttpException("User not found", HttpStatus.NOT_FOUND); 
        }   

        
      }
    
   

}
