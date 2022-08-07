import AppDataSource from "../../database/dataSource";
import { User } from "../../entities/User";

export class IndexUserService {
    async execute() : Promise<User[]> {
        const repo = AppDataSource.getRepository(User);

        const users = await repo.find();

        return users;
    }
}