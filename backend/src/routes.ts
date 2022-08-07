import { Router } from 'express';
import UserController  from './controllers/UserController';
import ItemController  from './controllers/ItemController';
import OrderController from './controllers/OrderController';

const routes = Router();

routes.get   ('/RestAPIFurb/usuarios'    , UserController.index  );
routes.post  ('/RestAPIFurb/usuarios'    , UserController.create );
routes.put   ('/RestAPIFurb/usuarios/:id', UserController.update );
routes.delete('/RestAPIFurb/usuarios/:id', UserController.destroy);

routes.get   ('/RestAPIFurb/itens'    , ItemController.index  );
routes.post  ('/RestAPIFurb/itens'    , ItemController.create );
routes.put   ('/RestAPIFurb/itens/:id', ItemController.update );
routes.delete('/RestAPIFurb/itens/:id', ItemController.destroy);

routes.get   ('/RestAPIFurb/comandas'    , OrderController.index  );
routes.get   ('/RestAPIFurb/comandas/:id', OrderController.show   );
routes.post  ('/RestAPIFurb/comandas'    , OrderController.create );
routes.put   ('/RestAPIFurb/comandas/:id', OrderController.update );
routes.delete('/RestAPIFurb/comandas/:id', OrderController.destroy);

export default routes;