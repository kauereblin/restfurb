import AppDataSource from "../../database/dataSource";
import { Item } from "../../entities/Item";

type ItemRequest = {
    name: string;
    price: number;
};

export class CreateItemService {
    async execute({ name, price }: ItemRequest): Promise<Item | Error> {
        const repo = AppDataSource.getRepository(Item);

        if (await repo.findOneBy({ name }))
            return new Error("Produto já existe!");

        const item = repo.create({
            name,
            price
        });

        const result = await repo.save(item);
        if (result instanceof Error)
            return result;

        return item;
    }
}