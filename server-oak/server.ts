import { Application } from './src/lib/deps.ts';
import colorsRouter from './src/routers/colorsRouter.ts';

const app = new Application();

app.use(colorsRouter.routes());
app.use(colorsRouter.allowedMethods());
  
await app.listen({ port: 8000 });