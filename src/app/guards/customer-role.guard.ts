import { CanActivateFn } from '@angular/router';

export const CustomerRoleGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('userRole');
  if(role === 'USER'){
    return true;
  } else{
    return false;
  }
};
