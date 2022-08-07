import AppDataSource from "../../database/dataSource";
import { User } from "../../entities/User";

type UserRequest = {
    name: string;
    phone: string;
};

export class CreateUserService {
    async execute({ name, phone }: UserRequest): Promise<User | Error> {
        const repo = AppDataSource.getRepository(User);

        if (await repo.findOneBy({ phone }))
            return new Error("Telefone já existe!");

        const user = repo.create({
            name,
            phone
        });

        const result = await repo.save(user);
        if (result instanceof Error)
            return result;

        return user;
    }
}