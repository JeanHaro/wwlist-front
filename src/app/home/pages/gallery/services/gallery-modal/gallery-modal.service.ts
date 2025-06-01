import { inject, Injectable, signal } from '@angular/core';

// Cdk
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';

// Rxjs
import { Observable } from 'rxjs';

// Interfaces
import { GalleryCard } from '../../interfaces/gallery-card.interface';
import { ModalConfig } from '../../interfaces/modal-config.interface';

// Modal
import { CreateGalleryComponent } from '../../modals/create-gallery/create-gallery.component';

@Injectable({
  providedIn: 'root'
})
export class GalleryModalService {
  private dialog = inject(Dialog);
  private overlay = inject(Overlay);

  // Signal para el estado de modal
  private isOpen = signal(false);
  private currentModalData = signal<GalleryCard | null>(null);

  // Readonly signals para componentes
  readonly isModalOpen = this.isOpen.asReadonly();
  readonly modalData = this.currentModalData.asReadonly();

  /**
   * Abre el modal de creación/edición de gallery card
  */
  openCreateGalleryModal (data?: GalleryCard): Observable<GalleryCard | undefined> {
    const config: ModalConfig = {
      data: data || null,
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'wwlist-modal-backdrop',
      panelClass: 'wwlist-modal-panel',
      maxWidth: '100vh',
      width: '100vh',
      height: '90vh',
      maxHeight: '100vh',
    };

    return this.openModal(CreateGalleryComponent, config);
  }

  /**
   * Método genérico para abrir cualquier modal
  */
  private openModal<T, R = any> (
    component: ComponentType<T>,
    config: ModalConfig = {}
  ): Observable<R | undefined> {
    // Actualizar estado
    this.isOpen.set(true);
    this.currentModalData.set(config.data || null);

    const dialogRef: DialogRef<R, T> = this.dialog.open(component, {
      data: config.data,
      disableClose: config.disableClose ?? false,
      hasBackdrop: config.hasBackdrop ?? true,
      backdropClass: config.backdropClass || 'cdk-overlay-dark-backdrop',
      panelClass: config.panelClass || '',
      width: config.width,
      maxWidth: config.maxWidth,
      height: config.height,
      maxHeight: config.maxHeight,
      // Posicionamiento responsivo
      positionStrategy: this.getOptimalPositionStrategy()
    });

    // Limpiar estado cuando se cierre
    dialogRef.closed.subscribe(() => {
      this.isOpen.set(false);
      this.currentModalData.set(null);
    });

    return dialogRef.closed;
  }

  /**
   * Cerrar el modal programáticamente
  */
  closeModal (result?: any): void {
    // El Cdk Dialog maneja múltiples diálogos automáticamente
    this.dialog.closeAll();
  }

  /**
   * Verificar si hay modales abiertos
  */
  hasOpenModals(): boolean {
    return this.dialog.openDialogs.length > 0;
  }

  /**
   * 🎯 Estrategia de posicionamiento optimizada para W&WList
   * Considera el tipo de modal y el dispositivo
   */
  private getOptimalPositionStrategy() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Móvil: fullscreen para mejor experiencia
      return this.overlay.position()
        .global()
        .top('0')
        .left('0%')
        .right('0')
        .bottom('0');
    } else {


      // Desktop: ligeramente arriba del centro para formularios
      return this.overlay.position()
        .global()
        .centerHorizontally()
        .top('0');
    }
  }
}
