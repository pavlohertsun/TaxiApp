import { CanActivateFn } from '@angular/router';

export const DriverRoleGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('userRole');
  if(role === 'DRIVER'){
    return true;
  } else{
    return false;
  }
};
