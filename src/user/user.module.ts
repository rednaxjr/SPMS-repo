import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: '../upload',
    }),


],
  controllers: [UserController],
  exports:[UserService],
  providers: [UserService]
})
export class UserModule {}
