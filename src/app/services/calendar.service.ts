import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class CalendarService {
  // Signal que almacena el estado de actualización del calendario
  private refreshSignal: WritableSignal<boolean> = signal(false);

  // Observable para que otros componentes puedan reaccionar
  public refreshObservable$: Observable<boolean> = toObservable(
    computed(() => this.refreshSignal())
  );

  // Método para marcar que se debe actualizar el calendario
  triggerRefresh(): void {
    this.refreshSignal.set(true);
  }

  // Método para reiniciar el estado después de actualizar
  resetRefresh(): void {
    this.refreshSignal.set(false);
  }
}
