import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Departments} from './entities/department.entity'
@Module({
  imports:[
    TypeOrmModule.forFeature([Departments]), 

],
  providers: [DepartmentService],
  
  controllers: [DepartmentController],

})
export class DepartmentModule {}
