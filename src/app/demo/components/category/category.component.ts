import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "./category.service";
import {Category} from "./category";
import {ConfirmationService, Message, MessageService} from "primeng/api";
import {MessagesconfService} from "../../../messagesconf.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {InfoDTO} from "../../../info-dto";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit{
    myForm: FormGroup;
    editForm: FormGroup;
    category: number;
    categories: Category[] = [];
    msgs: Message[] = [];
    categoryToRemove: Category;
    categoryToRemoveName: string;
    statusCode: number;
    categoryDialog: boolean = false;
    temp:string;

    constructor(private fb: FormBuilder,
                private categoryService: CategoryService,
                private messageConf: MessagesconfService,
                private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.myForm = this.fb.group({
            provider: ['', [Validators.required, Validators.minLength(3)]]
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

    changingCategoryData(categoryToRemoveData: Category): void {
        this.categoryToRemove = categoryToRemoveData;
        this.categoryToRemoveName = categoryToRemoveData.category;
        this.categoryDialog = true;
    }


    onSubmit(): void {
        if (this.myForm.valid) {
            this.categoryService.createCategory(this.myForm.get('provider').value).subscribe(
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
    changeNameOfCategory(): void {
        if (this.editForm.valid) {
            this.categoryService.changeNameOfCategory(this.categoryToRemove, this.editForm.get('category').value).subscribe(
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
        this.categoryService.deleteCategory(id).subscribe(
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
        this.categoryService.getCategories().subscribe({
            next: (categories: Category[]) => {
                this.categories = categories;
            },
            error: (err) => {
                console.error('Error fetching categories', err);
            }
        });
    }
}
