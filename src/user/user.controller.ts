import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UploadedFile, UseInterceptors, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm'; 
import { diskStorage } from 'multer';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import {editFileName, imageFileFilter} from '../shared/shared'
@Controller('user')
@ApiTags('users') 
export class UserController {
    constructor(@InjectRepository(User) private usersRepository : Repository<User>,    public userService: UserService ){ 

    }

    
    @Get()
    async getAll():Promise<User[]>{
        return this.userService.GetAll();  
    }
    
    @Post('create')
    async createuser(@Req() req):Promise<User>{
        return this.userService.createUser(req.body);
        // return this.userService.createUser(body )  ;  
    }
    

    // @Post('login')
    // async login(
    //     @Body() username:string,
    //     @Body() password:string,
    //     ):Promise<User>{
           
    //     try {
    //         const user = await this.userService.findUser(username);
         
    //         if(!user){
    //             throw new BadRequestException('Invalid Credentials');
    //         }
    
    //         if(!password && user.password){
    //             throw new BadRequestException('Invalid Credentials');
    //         }
    //         return  user;
    //     } catch (error) {
    //         throw      error;
    //     } 
    // }
    @Get(':id')
    async getStudent(@Param('id')id: number): Promise<User> { 
        // localhost:3333/user/2

        try {
            const user = await this.userService.findOne(id);
            return  user;
        } catch (error) {
            throw      error;
        }
    }
    @Get('getUuser/:id')
    async getUser(@Param('id')username: string): Promise<User> { 


        try {
            const user = await this.userService.findUser(username);
            return  user;
        } catch (error) {
            throw      error;
        }
    }
    @Get('getbyUsername/:username')
    async getbyUsername(@Param('username')username: string): Promise<User> { 

        console.log("sulod");
        try {
            const user = await this.userService.findUser(username);
            return  user;
        } catch (error) {
            throw      error;
        }
    }
    @Put('updateUser/:id')     
    async update(@Param('id',ParseIntPipe)id: number, @Req() req) { 
        return   await this.userService.update(id, req.body ); 
    }    
    // async update(@Param('id',ParseIntPipe)id: number, @Body() UserData:CreateUserDto) { 
    //     return   await this.userService.update(id, UserData ); 
    // }

   
    @Delete('delete/:id')
    async delete( @Param('id',ParseIntPipe) @Body() id:number ): Promise<User>{
        const response = await this.userService.deleteUser(id);
        return response;
    }
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './src/user/users-images',
            filename: editFileName,
          }),
          fileFilter: imageFileFilter,
        }),
      )
      async uploadedFile(@UploadedFile() file, @Request() req) {
         
        console.log(JSON.parse(req.body.body))
        const newFileName = file.filename; 
        return this.userService.createUser2(newFileName, JSON.parse(req.body.body))
    
       
      }
      


  }