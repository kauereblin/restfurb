import AppDataSource from "../../database/dataSource";
import { Item } from "../../entities/Item";

export class IndexItemService {
    async execute() : Promise<Item[]> {
        const repo = AppDataSource.getRepository(Item);

        const items = await repo.find();

        return items;
    }
}