import { Router } from '../lib/deps.ts';
import * as colorsController from '../controllers/colorsController.ts';

const colorsRouter = new Router();

colorsRouter
    .get('/', colorsController.render)
    .get('/colors', colorsController.getColors)
    .post('/colors', colorsController.postColor);

export default colorsRouter;