/**
 * Configuración del efecto 3D para la tarjeta
*/
export interface TiltSettings3D {
  maxRotation: number; // Rotación máxima en grados
  perspective: number; // Perspectiva 3D
  scale: number; // Escala al hacer hover
  transitionSpeed: string; // Velocidad de transicion
  easing: string; // Curva de aceleracion
}

/**
 * Estado actual de transformación de la tarjeta
*/
export interface CardTransform {
  rotateX: number; // Rotación en X
  rotateY: number; // Rotación en Y
  scale: number; // Escala
}
