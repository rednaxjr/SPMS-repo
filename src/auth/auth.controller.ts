import { Controller, Post, UseGuards , Request, Body, BadRequestException, Get, Param} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(
        @InjectRepository(User) private usersRepository : Repository<User>, 
         public userService: UserService,
         private authService: AuthService ,
    ){ 
    
    }
    @Post('login') 
    async  login(@Request() req){
        
         return this.authService.validateUser(req.body);
       
    }

}
