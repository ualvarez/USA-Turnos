import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../_modules/members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {  
  canDeactivate(component: MemberEditComponent): boolean {
    if(component.editForm.dirty){
      return confirm('¿Estas seguro que deseas continuar? Cualquier cambio sin guardar se perderá');
    }
    return true;
  }
  
}
