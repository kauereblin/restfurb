import AppDataSource from "../../database/dataSource";
import { User } from "../../entities/User";

type UserUpdateRequest = {
    id: number;
    name: string;
    phone: string;
};

export class UpdateUserService {
    async execute({ id, name, phone }: UserUpdateRequest): Promise<User | Error> {
        const repo = AppDataSource.getRepository(User);

        const userExist = await repo.findOneBy({ id });

        if (!(userExist))
            return new Error("Usuário não existe!");

        if (await repo.findOneBy({ phone }))
            return new Error("Telefone já existe!");

        userExist.name  = name  ? name  : userExist.name ;
        userExist.phone = phone ? phone : userExist.phone;

        const result = await repo.save(userExist);
        if (result instanceof Error)
            return result;

        return userExist;
    }
}
