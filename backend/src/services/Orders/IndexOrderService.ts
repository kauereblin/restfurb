import AppDataSource from "../../database/dataSource";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";
import { Item } from "../../entities/Item";

export class IndexOrderService {
    async execute() {
        const repoOrder = AppDataSource.getRepository(Order);
        const repoUser = AppDataSource.getRepository(User);
        const repoItem = AppDataSource.getRepository(Item);

        const orders = await repoOrder.find({ relations: ["items"] });
        
        let returnOrders = new Array();

        for (const order of orders) {
            const userExist = await repoUser.findOneBy({ id: order.user_id })
            
            if (!userExist)
                return new Error("Usuário removido!");

            let returnItem = new Array();

            for (const item of order.items) {
                const itemExist = await repoItem.findOneBy({ id: item.id })

                if (!itemExist)
                    return new Error("Produto removido!");

                returnItem.push({
                    "id": itemExist.id,
                    "nome": itemExist.name,
                    "preco": itemExist.price,
                })
            }

            returnOrders.push({
                "idUsuario": order.user_id,
                "nomeUsuario": userExist?.name,
                "telefoneUsuario": userExist?.phone,
                "produtos": returnItem,
            });
        }

        return returnOrders;
    }
}