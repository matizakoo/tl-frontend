import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from "./category.component";
import {Routes} from "@angular/router";
import {CategoryRoutingModule} from "./category-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MultiSelectModule} from "primeng/multiselect";
import {MessagesModule} from "primeng/messages";
import {ConfirmationService, MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {Ripple} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationComponent} from "../uikit/menus/confirmation.component";
import {DialogModule} from "primeng/dialog";

@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        InputTextModule,
        DropdownModule,
        InputTextareaModule,
        ButtonModule,
        ReactiveFormsModule,
        TableModule,
        ToggleButtonModule,
        MultiSelectModule,
        MessagesModule,
        MessageModule,
        Ripple,
        ConfirmDialogModule,
        DialogModule,
    ],
    providers: [MessageService, ConfirmationService]
})
export class CategoryModule {
}
