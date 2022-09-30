import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity('Customer')
export class Customers {
    @PrimaryColumn()
    ID: string;
    @Column()
    NAME: string;
    @Column()
    CONTACT: string;
    @Column()
    EMAIL: string;
    @Column()
    GENDER: string;
    @Column()
    ADDRESS: string;
    @Column()
    PASSWORD: string;

   
}
