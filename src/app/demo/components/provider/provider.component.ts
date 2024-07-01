import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {NgForOf, NgIf} from "@angular/common";
import {ConfirmationService, Message, PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {Category} from "../category/category";
import {CategoryService} from "../category/category.service";
import {MessagesconfService} from "../../../messagesconf.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {InfoDTO} from "../../../info-dto";
import {ProviderService} from "./provider.service";
import {Provider} from "./provider";

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
})
export class ProviderComponent {
    myForm: FormGroup;
    editForm: FormGroup;
    category: number;
    providers: Provider[] = [];
    msgs: Message[] = [];
    providerToRemove: Provider;
    providerToRemoveName: string;
    statusCode: number;
    categoryDialog: boolean = false;
    temp:string;

    constructor(private fb: FormBuilder,
                private providerService: ProviderService,
                private messageConf: MessagesconfService,
                private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.myForm = this.fb.group({
            category: ['', [Validators.required, Validators.minLength(3)]]
        });

        this.editForm = this.fb.group({
            category: ['', [Validators.required, Validators.minLength(3)]]
        });

        this.getCategories();
    }

    confirmDeleteCategory(id: bigint): void {
        this.confirmationService.confirm({
            message: 'Czy na pewno chcesz usunąć tę kategorię?',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            accept: () => {
                this.onDeleteCategory(id);
            }
        });
    }

    changingCategoryData(providerToRemoveData: Provider): void {
        this.providerToRemove = providerToRemoveData;
        this.providerToRemoveName = providerToRemoveData.nameOfProvider;
        this.categoryDialog = true;
    }


    onSubmit(): void {
        console.log('xxx')
        console.log('aa: ' + this.myForm.get('category').value)
        if (this.myForm.valid) {
            this.providerService.createCategory(this.myForm.get('category').value).subscribe(
                (response: HttpResponse<InfoDTO>) => {
                    this.statusCode = response.status;
                    this.msgs = this.messageConf.getMessage(this.statusCode);
                    if (response.body && response.body.info) {
                        this.msgs.push({ severity: 'info', summary: 'Info', detail: response.body.info });
                    }
                    this.myForm.reset();  // Reset formularza po zakończeniu operacji
                    this.ngOnInit();  // Ponowna inicjalizacja komponentu po zakończeniu operacji
                },
                (error: HttpErrorResponse) => {
                    this.statusCode = error.status;
                    if (error.error && error.error.info) {
                        this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error.info });
                    } else {
                        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unexpected error occurred' });
                    }
                }
            );
        } else {
            this.msgs = this.messageConf.getMessage(404);
        }
    }
    changeNameOfProvider(): void {
        if (this.editForm.valid) {
            this.providerService.changeNameOfCategory(this.providerToRemove, this.editForm.get('category').value).subscribe(
                (response: HttpResponse<InfoDTO>) => {
                    this.statusCode = response.status;
                    this.msgs = this.messageConf.getMessage(this.statusCode);
                    if (response.body && response.body.info) {
                        this.msgs.push({ severity: 'info', summary: 'Info', detail: response.body.info });
                    }
                    this.editForm.reset();
                    this.categoryDialog = false;
                    this.ngOnInit();
                },
                (error: HttpErrorResponse) => {
                    this.statusCode = error.status;
                    if (error.error && error.error.info) {
                        this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error.info });
                    } else {
                        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unexpected error occurred' });
                    }
                }
            );
        } else {
            this.msgs = this.messageConf.getMessage(404);
        }
    }


    async onDeleteCategory(id: bigint): Promise<void> {
        this.providerService.deleteCategory(id).subscribe(
            (response: HttpResponse<any>) => {
                this.statusCode = response.status;
                this.msgs = this.messageConf.getMessage(this.statusCode);
                this.getCategories();
            },
            error => {
                this.statusCode = error.status;
                this.msgs = this.messageConf.getMessage(this.statusCode);
            }
        );
    }

    getCategories(): void {
        this.providerService.getCategories().subscribe({
            next: (providers: Provider[]) => {
                this.providers = providers;
            },
            error: (err) => {
                console.error('Error fetching categories', err);
            }
        });
    }
}
