// Interface
import { GalleryCard } from "./gallery-card.interface";

export interface ModalConfig {
  data?: GalleryCard | null;
  disableClose?: boolean;
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
}

