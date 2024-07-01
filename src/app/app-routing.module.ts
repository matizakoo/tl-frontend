import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {AuthGuard} from "./auth-guard";
import {AuthModule} from "./demo/components/auth/auth.module";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'kategorie', loadChildren: () => import('./demo/components/category/category.module').then(m => m.CategoryModule) },
                    { path: 'dostawcy', loadChildren: () => import('./demo/components/provider/provider.module').then(m => m.ProviderModule) },
                    { path: 'kontrahenci', loadChildren: () => import('./demo/components/contractor/contractor.module').then(m => m.ContractorModule) },
                    { path: 'reklamacje', loadChildren: () => import('./demo/components/complaint/complaint.module').then(m => m.ComplaintModule) },
                ]
            },
            // {
            //     path: '/auth/login', component: AuthModule, canActivate: [AuthGuard]
            // },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard] },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
