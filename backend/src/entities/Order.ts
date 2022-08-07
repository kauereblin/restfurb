import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "userId"})
    public user_id: number;

    @ManyToOne(() => User, (user) => user.orders, { eager: true })
    public user: User;

    @ManyToMany(() => Item, item => item.orders, { eager: true })
    @JoinTable({
        name: 'orders_items_relation',
        joinColumn: {
            name: 'order_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'item_id',
            referencedColumnName: 'id',
        }
    })
    public items: Item[];

    public append(items: Item[]) {
        items.forEach(item => {
            let includeItem = new Item();

            includeItem.id = item.id;
            includeItem.name = item.name;
            includeItem.price = item.price;

            this.items.push(includeItem);
        });
    }
}
