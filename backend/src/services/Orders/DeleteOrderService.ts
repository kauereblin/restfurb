import AppDataSource from "../../database/dataSource";
import { Order } from "../../entities/Order";

export class DeleteOrderService {
    async execute(id: number) {
        const repo = AppDataSource.getRepository(Order);

        if (!(await repo.findOneBy({ id })))
            return new Error("Comanda não existe!");

        const result = await repo.delete(id);

        if (result instanceof Error)
            return new Error("Erro ao deletar comanda!");

        return {"success":{"text":"comanda removida"}};
    }
}