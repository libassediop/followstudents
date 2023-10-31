import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMontant'
})
export class FormatMontantPipe implements PipeTransform {
  transform(value: number): string {
    if (!isNaN(value)) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
      return ''; // Retournez une chaîne vide si la valeur n'est pas un nombre
    }
  }
}
