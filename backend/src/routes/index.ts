import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const routesPath = __dirname;

const routeFiles = fs
  .readdirSync(routesPath)
  .filter(
    (file) =>
      file !== 'index.ts' &&
      file !== 'index.js' &&
      file.endsWith('.router.ts')
  );

for (const file of routeFiles) {
  const route = require(path.join(routesPath, file));

  router.use(route.default);
}

export default router;