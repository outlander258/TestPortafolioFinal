import { inject } from "@angular/core";
import { CanActivateFn} from "@angular/router";
import { Router } from "@angular/router";

export const demonGuard : CanActivateFn = () =>{
    const userStorage =localStorage.getItem('username');
    const redirect = inject(Router)
   
  

    if (userStorage === 'USER') {
      return true ; // Permite el acceso a la ruta 'user'
    } else if (userStorage === 'DRIVER') {
      return true; // Permite el acceso a la ruta 'DRIVER'

    } else if (userStorage === 'ADMIN') {
        return true; // Permite el acceso a la ruta 'ADMIN'

    }else {
      // Redirige a la página de inicio de sesión si el tipo de usuario no es válido
      return redirect.navigate(['/login']);
    }
  }
   