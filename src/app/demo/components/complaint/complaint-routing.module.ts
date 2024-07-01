import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent} from "../category/category.component";
import {ComplaintComponent} from "./complaint.component";


const routes: Routes = [
    {
        path: '',
        component: ComplaintComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintRoutingModule { }
