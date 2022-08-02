import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { comparePass, passwordEncrypt } from 'src/utilities/bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository : Repository<User> ){}

    GetAll(): Promise<User[]>{
        return this.usersRepository.find();
    }

    
    async findOne(id: any): Promise<User> {
        return this.usersRepository.findOne({where: {id: parseInt(id, 10)}});
      }
      
      async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
      }

    async createUser(user):Promise<User>{

        const saltOrRounds = 10;
        const salt = bcrypt.genSaltSync(saltOrRounds);
        const hashpassword = await bcrypt.hash(user.password,salt);
 
    
    
        const newUser = this.usersRepository.create({
            username:user.username,
            password:hashpassword,
            fname:user.fname,
            lname:user.lname

        });
        
        return this.usersRepository.save(newUser);
    }
    async createUser2(filename, user):Promise<User>{
        const arrayss= [];

        const saltOrRounds = 10;
        const salt = bcrypt.genSaltSync(saltOrRounds);
        const hashpassword = await bcrypt.hash(user.password,salt);
        console.log(user.fname);
        console.log(user.lname);
        console.log(user.password);

       
        // try {
            const newUser = this.usersRepository.create({
                username:user.username,
                password:hashpassword,
                fname:user.fname,
                lname:user.lname,
                email:user.email,
                image : filename
    
            })
            // if(!newUser){
            //      return new HttpException("Invalid Username", HttpStatus.NOT_FOUND); 
            // }else{
                return await this.usersRepository.save(newUser).then().catch(err => {
                    throw new HttpException({
                      message: "Registration Failed"
                    }, HttpStatus.BAD_REQUEST);
                  });
            // }

           
        // } catch (error) {
            
        // }
        
        
      
    }

    async deleteUer(id:any):Promise<User>{
        const userdata = await this.findOne( id );


        return await this.usersRepository.remove(userdata)
         
    }

    async update(id:any, user:any ) {    
        // const updatedUser = await this.studentRepository.update(id, CreateStudentDto); 
       
        const userinfo   =  await this.usersRepository.findOne({where: {id: parseInt(id, 10)}});
        const saltOrRounds = 10;
        const hashpassword = await bcrypt.hash(user.newpass,saltOrRounds);

        const isMatch = comparePass(userinfo.password,user.password);
        console.log(isMatch);

        if(!isMatch){
            return new HttpException("Password dont match in old password", HttpStatus.BAD_REQUEST); 
        }else{


            const newDetails =({
                username:user.username,
                password:hashpassword,
                fname:user.fname,
                lname:user.lname    
    
            });

            return   await this.usersRepository.update(id, newDetails); 
            
        } 
    }   

    async findUser(UserEmail: string)    {
        
        return this.usersRepository.findOne( {email:UserEmail} ); //Select * user Where username = '$username'



    }
      
    async deleteUser(id:any):Promise<User>{
        const userdata = await this.findOne( id );


        return await this.usersRepository.remove(userdata)
         
    }
}
