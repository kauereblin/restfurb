import { Router } from 'express';
import UserController  from './controllers/UserController';
import ItemController  from './controllers/ItemController';
import OrderController from './controllers/OrderController';

import { ensureAuth } from './middlewares/EnsureAuth';

const routes = Router();

routes.get   ('/RestAPIFurb/usuarios'    , UserController.index  );
routes.post  ('/RestAPIFurb/usuarios'    , UserController.create );
routes.put   ('/RestAPIFurb/usuarios/:id', UserController.update );
routes.delete('/RestAPIFurb/usuarios/:id', UserController.destroy);

routes.get   ('/RestAPIFurb/itens'    , ItemController.index  );
routes.post  ('/RestAPIFurb/itens'    , ItemController.create );
routes.put   ('/RestAPIFurb/itens/:id', ItemController.update );
routes.delete('/RestAPIFurb/itens/:id', ItemController.destroy);

routes.get   ('/RestAPIFurb/comandas'    , ensureAuth, OrderController.index  );
routes.get   ('/RestAPIFurb/comandas/:id', ensureAuth, OrderController.show   );
routes.post  ('/RestAPIFurb/comandas'    , ensureAuth, OrderController.create );
routes.put   ('/RestAPIFurb/comandas/:id', ensureAuth, OrderController.update );
routes.delete('/RestAPIFurb/comandas/:id', ensureAuth, OrderController.destroy);

export default routes;