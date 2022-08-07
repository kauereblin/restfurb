import { Request, Response } from 'express';
import { CreateItemService } from '../services/Items/CreateItemService';
import { IndexItemService  } from '../services/Items/IndexItemService' ;
import { UpdateItemService } from '../services/Items/UpdateItemService';
import { DeleteItemService } from '../services/Items/DeleteItemService';

export default {
    async index(req: Request, res: Response) {
        const service = new IndexItemService();

        const result = await service.execute();

        if (result instanceof Error)
            return res.status(501).json(result.message);

        return res.status(200).json(result);
    },

    async show(req: Request, res: Response) {
        return res.status(501).end();
    },

    async create(req: Request, res: Response) {
        const { name, price } = req.body;

        const service = new CreateItemService();

        const result = await service.execute({ name, price });

        if (result instanceof Error)
            return res.status(501).json(result.message);

        return res.status(201).json(result);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, price } = req.body;
        const idNumber = parseInt(id);

        const service = new UpdateItemService();

        const result = await service.execute({ id: idNumber, name, price });

        if (result instanceof Error)
            return res.status(501).json(result.message);

        return res.status(201).json(result);
    },

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id);

        const service = new DeleteItemService();

        const result = await service.execute(idNumber);

        if (result instanceof Error)
            return res.status(501).json(result.message);

        return res.status(200).json(result);
    }
};
