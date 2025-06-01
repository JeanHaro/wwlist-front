export type CardStatus = 'completed' | 'waiting' | 'in-progress';

export interface DynamicImage {
  jpg: string;
  webp: string;
  avif: string;
}

export interface GalleryCard {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  rating: number;
  start_date?: Date;
  end_date?: Date;
  seasons?: number;
  total: number;
  status: CardStatus;
  platform: string;
  completed: boolean;
  imageUrl: string;
  imageFormats?: DynamicImage
  linkUrl: string;
}
