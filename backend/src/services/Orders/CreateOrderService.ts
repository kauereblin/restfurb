import AppDataSource from "../../database/dataSource";
import { Item } from "../../entities/Item";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";

type OrderRequest = {
    user: User;
    produtos: Item[];
};

export class CreateOrderService {
    async execute({ user, produtos }: OrderRequest) {
        const items = produtos;

        const repoUser = AppDataSource.getRepository(User);
        const repoItem = AppDataSource.getRepository(Item);
        const repoOrder = AppDataSource.getRepository(Order);

        const userExist = await repoUser.findOneBy({ id: user.id });

        if (!userExist)
            return new Error("Usuário não existe!");
        
        let returnItem = new Array();

        let error = false;
        for (const item of items) {
            const itemExist = await repoItem.findOneBy({ id: item.id });

            if (!itemExist) {
                error = true;
                break;
            }

            returnItem.push({
                "id": itemExist.id,
                "nome": itemExist.name,
                "preco": itemExist.price,
            });
        }
        if (error)
            return new Error("Algum produto não existe!");

        const order = repoOrder.create({
            user_id: user.id,
            user: user,
            items
        });

        const result = await repoOrder.save(order);

        if (result instanceof Error)
            return result;

        let obj = {
            "id": order.id,
            "idUsuario": userExist.id,
            "nomeUsuario": userExist.name,
            "telefoneUsuario": userExist.phone,
            "produtos": returnItem,
        };

        return obj;
    }
}