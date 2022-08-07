import AppDataSource from "../../database/dataSource";
import { Item } from "../../entities/Item";

type ItemUpdateRequest = {
    id: number;
    name: string;
    price: number;
};

export class UpdateItemService {
    async execute({ id, name, price }: ItemUpdateRequest): Promise<Item | Error> {
        const repo = AppDataSource.getRepository(Item);

        const itemExist = await repo.findOneBy({ id });

        if (!(itemExist))
            return new Error("Item não existe!");

        itemExist.name  = name  ? name  : itemExist.name ;
        itemExist.price = price ? price : itemExist.price;

        const result = await repo.save(itemExist);
        if (result instanceof Error)
            return result;

        return itemExist;
    }
}
