import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class oldInputMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedMethods = ['POST', 'PATCH', 'PUT'];

    if (allowedMethods.includes(req.method)) {
      const formKey = req.originalUrl;
      (req.session as { oldInput?: Record<string, any> }).oldInput =
        (req.session as { oldInput?: Record<string, any> }).oldInput || {};
      (req.session as { oldInput?: Record<string, any> }).oldInput[formKey] =
        req.body;

      const successStatusCodes = [200, 201, 202, 204, 301, 302, 303];
      res.on('finish', () => {
        if (successStatusCodes.includes(res.statusCode)) {
          delete (req.session as { oldInput?: Record<string, any> }).oldInput?.[
            formKey
          ];
        }
      });
    }

    next();
  }
}
