import { AbstractControl } from '@angular/forms';

export function ConfirmPassword(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const cPassword = control.get('confirm_password');

    return password && cPassword && password.value !== cPassword.value ? { misMatch: true } : null;
}
