import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';

// Forms
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

// Cdk
import {
  DIALOG_DATA,
  DialogRef
} from '@angular/cdk/dialog';

import {
  IconDefinition,
  faArrowLeft,
  faCamera,
  faStar,
  faTrash,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { Select } from '../../interfaces/select.interface';
import { GalleryCard } from '../../interfaces/gallery-card.interface';

@Component({
  selector: 'modal-create-gallery',
  standalone: false,
  templateUrl: './create-gallery.component.html',
  styleUrl: './create-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'wwlist-create-gallery-modal',
    '[attr.aria-modal]': 'true',
    '[attr.role]': '"dialog"',
    '[attr.aria-labelledby]': '"modal-title"'
  }
})
export class CreateGalleryComponent implements OnInit {
  // Servicios Cdk Dialog
  private dialogRef = inject(DialogRef<GalleryCard>);
  private dialogData = inject(DIALOG_DATA, { optional: true });
  private fb = inject(FormBuilder);

  // Iconos
  readonly faArrowLeft: IconDefinition = faArrowLeft
  readonly faStar: IconDefinition = faStar;
  readonly faXmark: IconDefinition = faXmark;
  readonly faCamera: IconDefinition = faCamera;
  readonly faTrash: IconDefinition = faTrash;

  // Formulario reactivo
  galleryForm!: FormGroup;

  // Estados reactivos con signals
  isLoading = signal(false);
  isEditing = signal(false);
  previewImage = signal<string | null>(null);


  // TODO: Opciones de los selectores
  selects = signal<Select>({
    category: { name: 'Categorias', value: '', options: ['Animes', 'Series', 'Películas'] },
    subcategory: { name: 'Subcategorías', value: '', options: ['Clásico', 'Moderno', 'Acción'] },
    qualification: { name: 'Calificación', value: '', options: [
      '★☆☆☆☆',
      '★★☆☆☆',
      '★★★☆☆',
      '★★★★☆',
      '★★★★★'
    ]},
    state: { name: 'Estado', value: '', options: ['Completado', 'En proceso', 'En espera'] },
    platform: { name: 'Plataforma', value: '', options: ['Netflix', 'Amazon', 'HBO', 'Disney+', 'Crunchyroll'] },
  });

  card = computed<GalleryCard>(() => {
    const formValue = this.galleryForm?.value || {};
    const currentImage = this.previewImage() || 'assets/images/not-found.jpg';

    return {
      id: this.dialogData?.id || '0',
      name: formValue.name || 'Nombre del contenido',
      category: this.selects()['category'].value || 'Categoría',
      subcategory: this.selects()['subcategory'].value || 'Subcategoría',
      rating: this.getRatingFromStars(this.selects()['qualification'].value),
      total: formValue.total || 1,
      status: this.getStatusFromText(this.selects()['state'].value),
      platform: this.selects()['platform'].value || 'Plataforma',
      completed: this.selects()['state'].value === 'Completado',
      imageUrl: currentImage,
      imageFormats: currentImage.startsWith('data:image/')
      ? undefined
      : {
        jpg: currentImage,
        webp: currentImage.replace('.jpg', '.webp') || 'assets/images/not-found.webp',
        avif: currentImage.replace('.jpg', '.avif') || 'assets/images/not-found.avif'
      },
      linkUrl: formValue.linkUrl || ''
    };
  });

  readonly filterKeys = computed<string[]>(() => {
    return Object.keys(this.selects() || {});
  })

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormData();
  }

  private initializeForm(): void {
    this.galleryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      subcategory: [''],
      platform: ['', Validators.required],
      state: ['En espera', Validators.required],
      qualification: ['★★★☆☆'],
      seasons: [1, [Validators.min(1)]],
      total: [1, [Validators.min(1)]],
      linkUrl: ['', [Validators.pattern('https?://.+')]]
    })
  }

  private setupFormData(): void {
    if (this.dialogData) {
      this.isEditing.set(true);
      this.galleryForm.patchValue({
        name: this.dialogData.name,
        category: this.updateSelect('category', this.dialogData.category) ?? this.dialogData.category,
        subcategory: this.updateSelect('subcategory', this.dialogData.subcategory) ?? this.dialogData.subcategory,
        platform: this.updateSelect('platform', this.dialogData.platform) ?? this.dialogData.platform,
        state: this.updateSelect('state', this.getTextFromStatus(this.dialogData.status)) ?? this.dialogData.status,
        qualification: this.updateSelect('qualification', this.getStarsFromRating(this.dialogData.rating)) ?? this.dialogData.rating,
        total: this.dialogData.total,
        linkUrl: this.dialogData.linkUrl
      });

      this.previewImage.set(this.dialogData.imageUrl)
    }
  }

  // TODO: Manejo de archivo de imagen
  onFileSelected (event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) return;

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage.set(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  // TODO: Actualiza las opciones de los selectores
  updateSelect (tipo: string, value: string): void {
    let updatedTypeOption = {
      ...this.selects(),
      // Para la clave específica ([tipo]), mantiene todas las propiedades existentes pero actualiza value
      [tipo]: {
        ...(this.selects()[tipo] || { value: '', options: [] }),
        value: value
      }
    };

    if (this.galleryForm.get(tipo)) {
      this.galleryForm.get(tipo)?.setValue(value);
      this.galleryForm.get(tipo)?.markAsTouched();
    }

    return this.selects.set(updatedTypeOption);
  }

  // TODO: Guardar tarjeta
  OnSave(): void {
    if (this.galleryForm.valid) {
      this.isLoading.set(true);

      // Simular guardado
      setTimeout(() => {
        const cardData = this.card();
        this.dialogRef.close(cardData);
        this.isLoading.set(false);
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  // TODO: Cancelar y cerrar modal
  onCancel(): void {
    this.dialogRef.close();
  }

  // TODO: Eliminar imagen
  onDeleteImag(): void {
    this.previewImage.set(null);
  }

  // TODO: Utilidades
  private markFormGroupTouched(): void {
    Object.keys(this.galleryForm.controls).forEach(field => {
      const control = this.galleryForm.get(field);

      control?.markAllAsTouched();
    })
  }

  private getRatingFromStars (stars: string): number {
    return stars ? stars.split('★').length - 1 : 3;
  }

  private getStarsFromRating (rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  private getStatusFromText (text: string): 'completed' | 'in-progress' | 'waiting' {
    switch (text) {
      case 'Completado': return 'completed';
      case 'En proceso': return 'in-progress';
      default: return 'waiting'
    }
  }

  private getTextFromStatus (status: string): string {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En proceso';
      default: return 'En espera'
    }
  }

  // Getters para validación
  get isFormValid(): boolean {
    return this.galleryForm.valid;
  }

  get nameError(): string | null {
    const control = this.galleryForm.get('name');

    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'El nombre es requerido';
      if (control.errors['mingLength']) return 'Mínimo 2 caracteres'
    }

    return null;
  }
}
