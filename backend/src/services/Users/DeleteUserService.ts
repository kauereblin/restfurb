import AppDataSource from "../../database/dataSource";
import { User } from "../../entities/User";

export class DeleteUserService {
    async execute(id: number) {
        const repo = AppDataSource.getRepository(User);

        if (!(await repo.findOneBy({ id })))
            return new Error("Usário não existe!");

        const result = await repo.delete(id);

        if (result instanceof Error)
            return new Error("Erro ao deletar usuário!");

        return {"success": "ok"};
    }
}