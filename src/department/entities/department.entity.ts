import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Departments {
    @PrimaryGeneratedColumn({
        type:"int"
    })
    id: number;

    @Column({
        type:"varchar",
        length:35,
        nullable:true
    })
    name:string;
 

    


}