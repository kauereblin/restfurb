import { Entity, Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity("items")
export class Item {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "name" })
    public name: string;

    @Column({ name: "price" })
    public price: number;

    @ManyToMany(() => Order, order => order.items, { cascade: true })
    public orders: Order[];
}