import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('studyflow_token');
        localStorage.removeItem('studyflow_user');
      }
      return throwError(() => error);
    }),
  );
