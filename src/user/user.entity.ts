import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    


}