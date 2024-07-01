import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {ProductService} from './demo/service/product.service';
import {CountryService} from './demo/service/country.service';
import {CustomerService} from './demo/service/customer.service';
import {EventService} from './demo/service/event.service';
import {IconService} from './demo/service/icon.service';
import {NodeService} from './demo/service/node.service';
import {PhotoService} from './demo/service/photo.service';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./demo/components/auth/auth.interceptor";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {ProviderComponent} from "./demo/components/provider/provider.component";
import {ProviderModule} from "./demo/components/provider/provider.module";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ReactiveFormsModule,
        HttpClientModule,
        ConfirmDialogModule,
        ProviderModule,
        TooltipModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor, multi: true},
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
