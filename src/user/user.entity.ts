import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departments } from "src/department/entities/department.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname:string;

    @Column()
    lname:string;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    image:string;

    @Column()
    otp:number;

    @Column()
    isEmailVerified:number;

    
    @OneToOne(() => Departments)
    @JoinColumn({
     
    })
    department_id: Departments

}