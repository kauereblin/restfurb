import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "name" })
    public name: string;

    @Column({ name: "phone" })
    public phone: string;

    @OneToMany(() => Order, (order) => order.user, { cascade: true })
    public orders: Order[];
}
