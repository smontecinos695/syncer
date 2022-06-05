import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from './core/models/paginated-result';
import url = require('url');

export interface Response<T> {
  data: T;
}

@Injectable()
export class NextLinkInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((d) => this.insertNextLink(d, context)));
  }

  insertNextLink(data, context: ExecutionContext) {
    const baseUrl = this.configService.get('APP_URL');
    const request = context.switchToHttp().getRequest();
    if (data instanceof PaginatedResult) {
      const requestURL = new url.URL(baseUrl + request.url);
      const { lastEvaluatedKey, results, count } = data;
      if (lastEvaluatedKey) {
        requestURL.searchParams.set('offset', lastEvaluatedKey);
        const next = requestURL.toString();
        return { count, results, next };
      }
      return { count, results };
    }
    return data;
  }
}
