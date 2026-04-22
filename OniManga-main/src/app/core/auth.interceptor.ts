import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  const isPublicRequest =
    req.url.includes('/api/manga/') ||
    req.url.includes('/api/token/') ||
    req.url.includes('/api/register/') ||
    req.url.includes('/api/status/');

  console.log('URL:', req.url);
  console.log('TOKEN:', token);
  console.log('isPublicRequest:', isPublicRequest);

  if (token && !isPublicRequest) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('AUTH HEADER ADDED');
  } else {
    console.log('AUTH HEADER NOT ADDED');
  }

  return next(req);
};