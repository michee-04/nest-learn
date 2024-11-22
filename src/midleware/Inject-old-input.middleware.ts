import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class InjectOldInputMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const formKey = req.originalUrl;
    (req.session as { oldInput?: Record<string, any> }).oldInput =
      (req.session as { oldInput?: Record<string, any> }).oldInput || {};
    res.locals.oldInput =
      (req.session as { oldInput?: Record<string, any> }).oldInput[formKey] ||
      {};
    delete (req.session as { oldInput?: Record<string, any> }).oldInput[
      formKey
    ];

    next();
  }
}
