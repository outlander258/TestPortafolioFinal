import { inject } from "@angular/core";
import { CanActivateFn} from "@angular/router";
import { Router } from "@angular/router";

export const demonGuard : CanActivateFn = () =>{
  const userStorage = localStorage.getItem('tipo_usuario');
    const redirect = inject(Router)
   
  

    if (userStorage === 'USER') {
      return true ; 
    } else if (userStorage === 'DRIVER') {
      return true; 

    } else if (userStorage === 'ADMIN') {
        return true; 

    }else {
      
      return redirect.navigate(['/login']);
    }
  }
   