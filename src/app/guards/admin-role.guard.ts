import { CanActivateFn } from '@angular/router';

export const AdminRoleGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('userRole');
  if(role === 'ADMIN'){
    return true;
  } else {
    return false;
  }
};
