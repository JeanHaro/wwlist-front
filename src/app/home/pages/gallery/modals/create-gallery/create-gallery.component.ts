import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild
} from '@angular/core';

// Forms
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

// CDK
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

// Servicios
import { DateService } from '../../../../../shared/services/date/date.service';

// Tipos locales para TypeScript strict mode
type FormErrorKeys = 'name' | 'category' | 'platform' | 'state' | 'qualification' | 'linkUrl';
type FormErrors = Record<FormErrorKeys, string | null>;
type ValidationErrorKeys = 'image' | 'general';
type ValidationErrors = Record<ValidationErrorKeys, string | null>;

@Component({
  selector: 'modal-create-gallery',
  standalone: false,
  templateUrl: './create-gallery.component.html',
  styleUrl: './create-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'wwlist-create-gallery-modal',
    '[attr.aria-modal]': 'true',
    '[attr.role]': '"dialog"',
    '[attr.aria-labelledby]': '"modal-title"',
    '[class.is-editing]': 'isEditing()',
    '[class.is-loading]': 'isLoading()',
    '[class.has-preview]': 'previewImage()',
    '[class.form-invalid]': '!isFormValid()',
    '[attr.aria-busy]': 'isLoading()',
    '[class.has-errors]': 'hasFormErrors()'
  }
})
export class CreateGalleryComponent implements OnInit {
  // ============================================
  // TODO: VIEWCHILD MODERNOS
  // ============================================
  readonly formRef = viewChild.required<ElementRef<HTMLFormElement>>('formElement');
  readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  // ============================================
  // TODO: INYECCIÓN DE DEPENDENCIAS
  // ============================================
  private readonly dialogRef = inject(DialogRef<GalleryCard>);
  private readonly dialogData = inject(DIALOG_DATA, { optional: true });
  private readonly fb = inject(FormBuilder);
  private readonly dateService = inject(DateService);

  // ============================================
  // TODO: ICONOS
  // ============================================
  readonly faArrowLeft: IconDefinition = faArrowLeft;
  readonly faStar: IconDefinition = faStar;
  readonly faXmark: IconDefinition = faXmark;
  readonly faCamera: IconDefinition = faCamera;
  readonly faTrash: IconDefinition = faTrash;

  // ============================================
  // TODO: SIGNALS OPTIMIZADOS
  // ============================================
  // # Estados básicos del componente
  readonly isLoading = signal(false);
  readonly isEditing = signal(false);
  readonly previewImage = signal<string | null>(null);
  readonly validationErrors = signal<ValidationErrors>({
    image: null,
    general: null
  });

  // # Signal para controlar reactivity del formulario
  private readonly formState = signal(0);

  // # Signal para gestión de archivos
  private readonly selectedFile = signal<File | null>(null);

  // # Signal de fecha
  fecha = signal<Date>(new Date);

  // # Formulario reactivo
  galleryForm!: FormGroup;

  // ============================================
  // TODO: CONFIGURACIÓN DE SELECTS
  // ============================================
  readonly selects = signal<Select>({
    category: {
      name: 'Categorías',
      value: '',
      options: ['Animes', 'Series', 'Películas'],
      allowCustom: true
    },
    subcategory: {
      name: 'Subcategorías',
      value: '',
      options: ['Clásico', 'Moderno', 'Acción'],
      allowCustom: true
    },
    qualification: {
      name: 'Calificación',
      value: '',
      options: ['★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★']
    },
    state: {
      name: 'Estado',
      value: '',
      options: ['Completado', 'En proceso', 'En espera']
    },
    platform: {
      name: 'Plataforma',
      value: '',
      options: ['Netflix', 'Amazon', 'HBO', 'Disney+', 'Crunchyroll'],
      allowCustom: true
    },
  });

  // ============================================
  // TODO: COMPUTED PROPERTIES
  // ============================================
  // # Verificar si el formulario es valido
  readonly isFormValid = computed(() => {
    this.formState(); // trigger dependency
    return this.galleryForm?.valid ?? false;
  });

  // # Verificar si el formulario cuenta con algún error
  readonly hasFormErrors = computed(() => {
    const errors = this.formErrors();
    return Object.values(errors).some(error => error !== null);
  });

  // # Validación de errores
  readonly formErrors = computed((): FormErrors => {
    this.formState(); // trigger dependency

    return {
      name: this.getFieldError('name', {
        required: 'El nombre es requerido',
        minLength: 'Mínimo 2 caracteres'
      }),
      category: this.getFieldError('category', {
        required: 'La categoría es requerida'
      }),
      platform: this.getFieldError('platform', {
        required: 'La plataforma es requerida'
      }),
      state: this.getFieldError('state', {
        required: 'El estado es requerido'
      }),
      qualification: this.getFieldError('qualification', {
        required: 'La calificación es requerida'
      }),
      linkUrl: this.getFieldError('linkUrl', {
        required: 'El enlace es requerido',
        pattern: 'Enlace incorrecto, debe iniciar con (https://...)'
      })
    };
  });

  // # Añadiendo valores al formulario
  readonly card = computed<GalleryCard>(() => {
    // Trigger reactivity
    this.formState();

    const formValue = this.galleryForm?.value || {};
    const currentImage = this.previewImage() || 'assets/images/not-found.jpg';

    return {
      id: this.dialogData?.id || '0',
      name: formValue.name || 'Nombre del contenido',
      category: this.selects()['category'].value || 'Categoría',
      subcategory: this.selects()['subcategory'].value || 'Subcategoría',
      rating: this.getRatingFromStars(this.selects()['qualification'].value),
      start_date: this.currentDate(),
      total: formValue.total || 1,
      seasons: formValue.seasons || 1,
      status: this.getStatusFromText(this.selects()['state'].value),
      platform: this.selects()['platform'].value || 'Plataforma',
      completed: this.selects()['state'].value === 'Completado',
      imageUrl: currentImage,
      imageFormats: this.buildImageFormats(currentImage),
      linkUrl: formValue.linkUrl || ''
    };
  });

  // # Crea y mantiene la lista de filtros de manera automatica
  readonly filterKeys = computed<string[]>(() => {
    return Object.keys(this.selects() || {});
  });

  // ============================================
  // TODO: EFFECTS MODERNOS (Angular v19)
  // ============================================
  constructor() {
    // Effect para auto-focus en primer campo con error
    effect(() => {
      const errors = this.formErrors();
      const errorKeys = Object.keys(errors) as Array<FormErrorKeys>;
      const firstErrorField = errorKeys.find(key => errors[key] !== null);

      if (firstErrorField && this.formRef()) {
        const element = this.formRef().nativeElement.querySelector(`#${firstErrorField}`) as HTMLElement;
        if (element) {
          setTimeout(() => element.focus(), 100);
        }
      }
    });

    // Effect para manejo de tecla Escape
    effect( (onCleanup) => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !this.isLoading()) {
          this.onCancel();
        }
      };

      document.addEventListener('keydown', handleEscape);

      // Cleanup function
      onCleanup(() => {
        document.removeEventListener('keydown', handleEscape);
      });
    });

    // Effect para validación reactiva del formulario
    effect( (onCleanup) => {
      if (this.galleryForm) {
        // Detecta cambios en valores del formulario
        const subscription = this.galleryForm.valueChanges.subscribe(() => {
          this.triggerReactivity();
        });

        // Detecta cambios en estado de validación
        const statusSubscription = this.galleryForm.statusChanges.subscribe(() => {
          this.triggerReactivity();
        });

        // Cleanup function
        onCleanup(() => {
          subscription.unsubscribe();
          statusSubscription.unsubscribe();
        });
      }
    });

    // Effect para limpiar errores cuando el formulario es válido
    effect(() => {
      if (this.isFormValid() && (this.validationErrors().image || this.validationErrors().general)) {
        this.validationErrors.set({
          image: null,
          general: null
        });
      }
    });

    // Effect para gestión de archivos
    effect(() => {
      const file = this.selectedFile();
      if (file) {
        this.processImageFile(file);
      }
    });
  }

  // ============================================
  // TODO: LIFECYCLE HOOKS
  // ============================================
  ngOnInit(): void {
    this.initializeForm();
    this.setupFormData();
  }

  // ============================================
  // TODO: GETTERS DE VALIDACIÓN (Alfabético)
  // ============================================
  // # Getter oara verificar si hay error de validación en el campo de categoría
  get categoryError(): string | null {
    return this.formErrors().category;
  }

  // # Getter oara verificar si hay error de validación en el campo de subir imagen
  get imageError(): string | null {
    return this.validationErrors().image;
  }

  // # Getter oara verificar si hay error de validación en el campo de general
  get generalError(): string | null {
    return this.validationErrors().general;
  }

  // # Getter oara verificar si hay error de validación en el campo de URL
  get linkUrlError(): string | null {
    return this.formErrors().linkUrl;
  }

  // # Getter oara verificar si hay error de validación en el campo de nombre
  get nameError(): string | null {
    return this.formErrors().name;
  }

  // # Getter oara verificar si hay error de validación en el campo de plataforma
  get platformError(): string | null {
    return this.formErrors().platform;
  }

  // # Getter oara verificar si hay error de validación en el campo de calificación
  get qualificationError(): string | null {
    return this.formErrors().qualification;
  }

  // # Getter oara verificar si hay error de validación en el campo de estado
  get stateError(): string | null {
    return this.formErrors().state;
  }

  // ============================================
  // TODO: MÉTODOS PÚBLICOS - EVENTOS DEL FORMULARIO
  // ============================================
  // # Validación de los inputs requeridos cuando se pierde el foco
  onInputBlur (fieldName: string): void {
    const control = this.galleryForm.get(fieldName);

    if (control) {
      control.markAsTouched();
      control.updateValueAndValidity();
      this.triggerReactivity();
    }
  }

  // # Validación de la imagen
  onFileSelected (event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files?.[0]) {
      const file = input.files[0];

      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.validationErrors.update(errors => ({
          ...errors,
          image: 'Solo se permiten archivos de imagen'
        }));
        return;
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        this.validationErrors.update(errors => ({
          ...errors,
          image: 'La imagen no puede superar los 5MB'
        }));
        return;
      }

      this.selectedFile.set(file);
    }
  }

  // # Eliminar la imagen
  onDeleteImage(): void {
    this.previewImage.set(null);
    this.selectedFile.set(null);

    // Limpiar el input de archivo
    if (this.fileInputRef()) {
      this.fileInputRef()!.nativeElement.value = '';
    }

    // Limpiar errores de imagen
    this.validationErrors.update(errors => ({
      ...errors,
      image: null
    }));
  }

  // # Agrega sin mutar al array original de las opciones
  addCustomOption (data: { fieldName: string, value: string }): void {
    const { fieldName, value } = data;

    if (!value.trim()) return;

    const currentSelect = this.selects()[fieldName];
    if (!currentSelect) return;

    // Verificar si la opción ya existe
    if (currentSelect.options.includes(value.trim())) {
      this.updateSelect(fieldName, value.trim());
      return;
    }

    // Agregar nueva opción
    const updatedSelects = {
      ...this.selects(),
      [fieldName]: {
        ...currentSelect,
        options: [...currentSelect.options, value.trim()],
        value: value.trim()
      }
    };

    this.selects.set(updatedSelects);

    // Actualizar FormControl
    this.updateFormControl(fieldName, value.trim());
  }

  // # Guardar Galería
  onSave(): void {
    if (!this.isFormValid()) {
      this.markFormGroupTouched();
      this.triggerReactivity();
      return;
    }

    this.isLoading.set(true);

    // Simular guardado con timeout realista
    setTimeout(() => {
      try {
        const cardData = this.card();
        this.dialogRef.close(cardData);
      } catch (error) {
        console.error('Error al guardar:', error);
        this.validationErrors.update(errors => ({
          ...errors,
          general: 'Error al guardar. Intente nuevamente.'
        }));
      } finally {
        this.isLoading.set(false);
      }
    }, 1000);
  }

  // # Cancelar modal
  onCancel(): void {
    if (this.isLoading()) return;

    this.dialogRef.close();
  }

  // # Fecha actual (Formato dd/MM/yyyy)
  currentDate(): string {
    return this.dateService.formatDate(new Date());
  }

  // ============================================
  // TODO: MÉTODOS PÚBLICOS - MANEJO DE SELECTS
  // ============================================
  // # Escoger una opción del select
  updateSelect (fieldName: string, value: string): void {
    // Actualizar signal de selects
    const updatedSelects = {
      ...this.selects(),
      [fieldName]: {
        ...(this.selects()[fieldName] || { value: '', options: [] }),
        value: value
      }
    };

    this.selects.set(updatedSelects);

    // Actualizar FormControl
    this.updateFormControl(fieldName, value);
  }

  // # Método para marcar select como touched cuando se interactúa sin seleccionar
  markSelectAsTouched (fieldName: string): void {
    const control = this.galleryForm.get(fieldName);

    if (control) {
      // Siempre marcar como touched cuando se interactúa con el select
      control.markAsTouched();
      control.updateValueAndValidity();
      this.triggerReactivity();
    }
  }

  // ============================================
  // TODO: MÉTODOS PRIVADOS - INICIALIZACIÓN
  // ============================================
  // # Configuración del formulario
  private initializeForm(): void {
    this.galleryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      subcategory: [''],
      platform: ['', Validators.required],
      state: ['', Validators.required],
      qualification: ['', Validators.required],
      seasons: [1, [Validators.min(1)]],
      total: [1, [Validators.min(1)]],
      linkUrl: ['', [
        Validators.required,
        Validators.pattern('https?://.+')
      ]]
    });
  }

  // # Para cargar valores cuando se va a editar
  private setupFormData(): void {
    if (!this.dialogData) return;

    this.isEditing.set(true);

    // Configurar selects primero
    this.updateSelect('category', this.dialogData.category);
    this.updateSelect('subcategory', this.dialogData.subcategory);
    this.updateSelect('platform', this.dialogData.platform);
    this.updateSelect('state', this.getTextFromStatus(this.dialogData.status));
    this.updateSelect('qualification', this.getStarsFromRating(this.dialogData.rating));

    // Luego actualizar el formulario
    this.galleryForm.patchValue({
      name: this.dialogData.name,
      total: this.dialogData.total,
      linkUrl: this.dialogData.linkUrl,
      seasons: this.dialogData.seasons || 1
    });

    this.previewImage.set(this.dialogData.imageUrl);
    this.triggerReactivity();
  }

  private processImageFile (file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.previewImage.set(e.target?.result as string);

      // Limpiar errores de imagen
      this.validationErrors.update(errors => ({
        ...errors,
        image: null
      }));
    };

    reader.onerror = () => {
      this.validationErrors.update(errors => ({
        ...errors,
        image: 'Error al cargar la imagen'
      }));
    };

    reader.readAsDataURL(file);
  }

  // # Actualiza un input del formulario
  private updateFormControl (fieldName: string, value: string): void {
    const control = this.galleryForm.get(fieldName);

    if (control) {
      control.setValue(value);
      control.markAsTouched();
      control.updateValueAndValidity();
    }

    this.triggerReactivity();
  }

  // ============================================
  // TODO: MÉTODOS PRIVADOS - UTILIDADES
  // ============================================
  // # Fuerza recálculo de los computed properties
  private triggerReactivity(): void {
    this.formState.update(v => v + 1);
  }

  // # Marca todos los campos del formulario
  private markFormGroupTouched(): void {
    Object.keys(this.galleryForm.controls).forEach(field => {
      const control = this.galleryForm.get(field);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }

  // # Convierte errores de Angular Form a mensajes
  private getFieldError (fieldName: string, errorMessages: Record<string, string>): string | null {
    const control = this.galleryForm.get(fieldName);

    if (control?.errors && control.touched) {
      for (const [errorType, message] of Object.entries(errorMessages)) {
        if (control.errors[errorType]) {
          return message;
        }
      }
    }

    return null;
  }

  // # Si no hay imagen o no corresponde a una imagen
  private buildImageFormats (imageUrl: string): any {
    if (imageUrl.startsWith('data:image/')) {
      return undefined;
    }

    return {
      jpg: imageUrl,
      webp: imageUrl.replace('.jpg', '.webp') || 'assets/images/not-found.webp',
      avif: imageUrl.replace('.jpg', '.avif') || 'assets/images/not-found.avif'
    };
  }

  // ============================================
  // TODO: MÉTODOS PRIVADOS - TRANSFORMADORES DE DATOS
  // ============================================
  // # Convertir la cantidad de estrellas ★ en números
  private getRatingFromStars(stars: string): number {
    return stars ? stars.split('★').length - 1 : 0;
  }

  // # Convertir el valor numérico en estrellas ★
  private getStarsFromRating(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  // # Convertir los estados en su identificador
  private getStatusFromText(text: string): 'completed' | 'in-progress' | 'waiting' {
    switch (text) {
      case 'Completado': return 'completed';
      case 'En proceso': return 'in-progress';
      default: return 'waiting';
    }
  }

  // # Convertir los identificadores de los estados a su nombre real
  private getTextFromStatus(status: string): string {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En proceso';
      default: return 'En espera';
    }
  }
}
