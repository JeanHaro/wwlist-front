export type CardStatus = 'completed' | 'waiting' | 'in-progress';

export interface GalleryCard {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  rating: number;
  year: string;
  status: CardStatus;
  platform: string;
  completed: boolean;
  imageUrl: string;
  linkUrl: string;
}
