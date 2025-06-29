import { Injectable } from '@angular/core';

import { format, parse, parseISO, getYear, isValid } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';

const PERU_TIMEZONE = 'America/Lima'; // Zona horaria de Perú

@Injectable({
  providedIn: 'root'
})
export class DateService {
  // TODO: Convertir cualquier fecha a la zona horaria de Perú
  toPeruTime (date: Date | string): Date {
    let dateObj: Date;

    if (typeof date === 'string') {
      if (date.includes('/')) {
        // Formato dd/MM/yyyy
        dateObj = parse(date, 'dd/MM/yyyy', new Date());
      } else if (date.includes('T') || date.includes('-')) {
        // Formato ISO o Date string
        dateObj = parseISO(date);
      } else {
        // Intentar como Date string nativo
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }

    // Verificar si la fecha es válida
    if (!isValid(dateObj)) {
      return new Date(); // Retornar fecha actual como fallback
    }

    return toZonedTime(dateObj, PERU_TIMEZONE);
  }

  // TODO: Obtener el año en zona horaria de Perú
  getPeruYear (date: Date | string): number {
    const peruDate = this.toPeruTime(date);

    return getYear(peruDate);
  }

  // TODO: Obtener el mes en zona horaria de Perú
  getPeruMonth (date: Date | string): number {
    const peruDate = this.toPeruTime(date);

    // Los meses en JavaScript son 0-11, así que sumamos 1
    return peruDate.getMonth() + 1;
  }

  // TODO: Formatear fecha en español
  formatDate (date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
    const peruDate = this.toPeruTime(date);

    return format(peruDate, formatStr, { locale: es });
  }

  // TODO: Convertir de zona horaria de Perú a UTC (util para guardar en MongoDB)
  fromPeruTime (date: Date): Date {
    return fromZonedTime(date, PERU_TIMEZONE);
  }

  // TODO: Obtiene año actual en Perú
  getCurrentYear(): number {
    return this.getPeruYear(new Date());
  }
}
