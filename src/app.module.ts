import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { User } from './user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DepartmentModule } from './department/department.module';
import { Departments } from './department/entities/department.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'students_profile',
      entities: [User,Departments ],
      synchronize: true,
    }),
    
    UserModule, AuthModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
