import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent} from "../category/category.component";
import {ContractorComponent} from "./contractor.component";

const routes: Routes = [
    {
        path: '',
        component: ContractorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContractorRoutingModule { }
