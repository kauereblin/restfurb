import AppDataSource from "../../database/dataSource";
import { Item } from "../../entities/Item";

export class DeleteItemService {
    async execute(id: number) {
        const repo = AppDataSource.getRepository(Item);

        if (!(await repo.findOneBy({ id })))
            return new Error("Item não existe!");

        const result = await repo.delete(id);

        if (result instanceof Error)
            return new Error("Erro ao deletar item!");

        return {"success": "ok"};
    }
}