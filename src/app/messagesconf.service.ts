import {Injectable} from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MessagesconfService {

    msgs: Message[] = [];

    constructor() {
    }

    getMessage(statusCode: number): { severity: string; summary: string; detail: string }[] {
        switch (statusCode) {
            case 200:
                return [{ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie wykonano operację' }];
            case 403:
                return [{ severity: 'warn', summary: 'Ostrzeżenie', detail: 'Nie masz uprawnień do zasobów' }];
            case 404:
                return [{ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd' }];
            case 400:
                return [{severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd'}];
            default:
                return [{ severity: 'info', summary: 'Powiadomienie', detail: 'Nie można wykonać operacji' }];
        }
    }


    // showInfoViaToast() {
    //     this.service.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    // }
    //
    // showWarnViaToast() {
    //     this.service.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    // }
    //
    // showErrorViaToast() {
    //     this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    // }
    //
    // showSuccessViaToast() {
    //     this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    // }
    //
    // showInfoViaMessages() {
    //     this.msgs = [];
    //
    // }
    //
    // showWarnViaMessages() {
    //     this.msgs = [];
    //
    // }
    //
    // showErrorViaMessages() {
    //     this.msgs = [];
    //
    // }
    //
    // showSuccessViaMessages() {
    //     this.msgs = [];
    //     this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    // }
}
