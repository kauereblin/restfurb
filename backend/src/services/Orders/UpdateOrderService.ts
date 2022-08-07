import AppDataSource from "../../database/dataSource";
import { Order } from "../../entities/Order";
import { Item } from "../../entities/Item";

type OrderUpdateRequest = {
    id: number;
    produtos: Item[];
};

export class UpdateOrderService {
    async execute({ id, produtos }: OrderUpdateRequest): Promise<Order | Error> {
        const repoOrder = AppDataSource.getRepository(Order);
        const repoItems = AppDataSource.getRepository(Item);

        const orderExist = await repoOrder.findOneBy({ id });

        if (!(orderExist))
            return new Error("Comanda não existe para ser alterada!");

        let includeItems = new Array<Item>();

        for (const item of produtos) {
            const itemExist = await repoItems.findOneBy({ id: item.id });

            if (!itemExist)
                return new Error("Algum produto não existe para ser adicionado!");

            includeItems.push(itemExist);
        }

        orderExist.append(includeItems);

        const result = await repoOrder.save({
            id,
            user_id: orderExist.user_id,
            items: orderExist.items
        });
        
        if (result instanceof Error)
            return result;

        return orderExist;
    }
}
