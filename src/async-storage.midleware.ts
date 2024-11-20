import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncStorageService } from '@nodesandbox/async-storage';

const ASYNC_STORAGE = AsyncStorageService.getInstance();

@Injectable()
export class AsyncStorageMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const context = new Map<string, any>();
    ASYNC_STORAGE.run(() => {
      ASYNC_STORAGE.set('currentUserId', '6703ad8092bf7940b9a0af42');
      next(); // Passe à la requête suivante
    }, context); // Le contexte doit être passé en deuxième paramètre ici
  }
}
