import { Request, Response } from 'express';
import { CreateUserService } from '../services/Users/CreateUserService';
import { IndexUserService  } from '../services/Users/IndexUserService' ;
import { UpdateUserService } from '../services/Users/UpdateUserService';
import { DeleteUserService } from '../services/Users/DeleteUserService';

export default {
    async index(req: Request, res: Response) {
        const service = new IndexUserService();

        const result = await service.execute();

        if (result instanceof Error)
            return res.status(400).json(result.message);

        return res.status(200).json(result);
    },

    async show(req: Request, res: Response) {
        return res.status(501).end();
    },

    async create(req: Request, res: Response) {
        const { name, phone } = req.body;

        const service = new CreateUserService();

        const result = await service.execute({ name, phone });

        if (result instanceof Error)
            return res.status(400).json(result.message);

        return res.status(201).json(result);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, phone } = req.body;
        const idNumber = parseInt(id);

        const service = new UpdateUserService();

        const result = await service.execute({ id: idNumber, name, phone });

        if (result instanceof Error)
            return res.status(400).json(result.message);

        return res.status(201).json(result);
    },

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id);

        const service = new DeleteUserService();

        const result = await service.execute(idNumber);

        if (result instanceof Error)
            return res.status(501).json(result.message);

        return res.status(200).json(result);
    }
};
