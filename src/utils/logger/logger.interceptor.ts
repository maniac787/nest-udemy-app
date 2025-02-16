import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('CONTEXT...', Object.keys(context));
    console.log('CONTEXT TYPE...', context['contextType']);
    console.log('CONTEXT ARGS...', Object.keys(context.getArgs()));
    console.log(
      'CONTEXT ARG BY INDEX 0...',
      Object.keys(context.getArgByIndex(0)),
    );

    const [req, res] = context.getArgs();
    console.log(req.params);
    return next
      .handle()
      .pipe(tap((value) => console.log(`Respuesta...`, value)));
  }
}
