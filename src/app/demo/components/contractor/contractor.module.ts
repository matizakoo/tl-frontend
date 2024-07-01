import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorRoutingModule } from './contractor-routing.module';
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MultiSelectModule} from "primeng/multiselect";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {Ripple} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {ContractorComponent} from "./contractor.component";
import {ConfirmationService, MessageService} from "primeng/api";


@NgModule({
  declarations: [ContractorComponent],
  imports: [
      CommonModule,
      ContractorRoutingModule,
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
export class ContractorModule { }
