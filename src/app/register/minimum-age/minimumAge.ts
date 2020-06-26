import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment'; // add this 1 of 4

export function MinimumAge(age: number): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        const date = moment(control.value.slice(0, 10).split('-'));
        console.log(date);
        if ( date.isValid()) {
            const now = moment().startOf('day');
            const dif = date.diff(now, 'years');
            console.log(dif);
            if (dif <= -18) {
                console.log('maiorDeIdade');
                return null;
            }
        }
        return { menorDeIdade: true };
    };
}
