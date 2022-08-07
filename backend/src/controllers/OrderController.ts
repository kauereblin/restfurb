import { Request, Response } from 'express';
import { User } from '../entities/User';
import { Item } from '../entities/Item';
import { CreateOrderService } from '../services/Orders/CreateOrderService';
import { IndexOrderService  } from '../services/Orders/IndexOrderService' ;
import { ShowOrderService   } from '../services/Orders/ShowOrderService'  ;
import { UpdateOrderService } from '../services/Orders/UpdateOrderService';
import { DeleteOrderService } from '../services/Orders/DeleteOrderService';

export default {
    async index(req: Request, res: Response) {
        const service = new IndexOrderService();

        const result = await service.execute();

        if (result instanceof Error)
            return res.status(400).json(result.message);

        return res.status(200).json(result);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id);

        const service = new ShowOrderService();

        const result = await service.execute(idNumber);

        if (result instanceof Error)
            return res.status(400).json(result.message);

        return res.status(200).json(result);
    },

    async create(req: Request, res: Response) {
        const { idUsuario, nomeUsuario, telefoneUsuario, produtos } = req.body;

        let user = new User();
        user.id = idUsuario;
        user.name = nomeUsuario;
        user.phone = telefoneUsuario;

        const service = new CreateOrderService();

        const result = await service.execute({ user, produtos });

        if (result instanceof Error)
            return res.status(400).json(result.message);

        return res.status(201).json(result);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { produtos } = req.body;
        const idNumber = parseInt(id);

        const service = new UpdateOrderService();

        const result = await service.execute({ id: idNumber, produtos });

        if (result instanceof Error)
            return res.status(400).json(result.message);

        return res.status(201).json(result);
    },

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = parseInt(id);

        const service = new DeleteOrderService();

        const result = await service.execute(idNumber);

        if (result instanceof Error)
            return res.status(501).json(result.message);

        return res.status(200).json(result);
    }
};
