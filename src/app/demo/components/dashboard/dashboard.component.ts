import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from './dashboard.service';
import { ProviderService } from '../provider/provider.service';
import { ContractorService } from '../contractor/contractor.service';
import { Complaint } from '../complaint/complaint';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    date: Date;
    amountOfReports: number;
    amountOfReportsThisWeek: number;
    year: string;
    commonProvider: string;
    commonContractor: string;
    complaintList: Complaint[];

    constructor(private productService: ProductService,
                public layoutService: LayoutService,
                public dashboardService: DashboardService,
                public providerService: ProviderService,
                public contractorService: ContractorService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.getDate();
        this.amountOfComplaints();
        this.getCommonProvider();
        this.getCommonContractor();
        this.getAmountOfComplaintsThisWeek();
        this.getDataForChart();
        this.getCriticalComplaints();
    }

    getCriticalComplaints(): void {
        this.dashboardService.getCriticalComplaints().subscribe({
            next: (complaintsList: Complaint[]) => {
                this.complaintList = complaintsList;
            },
            error: (err) => {
                console.error('Error fetching categories', err);
            }
        });
    }

    getDate() {
        this.dashboardService.getYear().subscribe(
            (year: Date) => {
                this.date = year;
                this.year = this.date.toString().substring(0,4);
            },
            (error: any) => console.error('Error fetching year', error)
        );
    }

    getCommonProvider() {
        this.providerService.commonProvider().subscribe(
            (commonProvider: string) => {
                this.commonProvider = commonProvider;
            }
        )
    }

    amountOfComplaints() {
        this.dashboardService.getAmountOfComplaints().subscribe(
            (amount: number) => {
                this.amountOfReports = amount;
            }
        )
    }

    getCommonContractor() {
        this.contractorService.getCommonContractor().subscribe(
            (contractor: string) => {
                this.commonContractor = contractor;
            }
        )
    }

    getAmountOfComplaintsThisWeek() {
        this.dashboardService.getAmountOfComplaintsThisWeek().subscribe(
            (amountOfReportsThisWeek: number) => {
                this.amountOfReportsThisWeek = amountOfReportsThisWeek;
            }
        )
    }

    getDataForChart() {
        this.dashboardService.getComplaintsByMonth().subscribe(
            (data: Map<number, number>) => {
                const documentStyle = getComputedStyle(document.documentElement);
                const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
                const complaintsData = new Array(12).fill(0);

                for (let [month, count] of Object.entries(data)) {
                    complaintsData[+month - 1] = count; // months are 1-indexed in Java but 0-indexed in JavaScript
                }

                this.chartData = {
                    labels: months,
                    datasets: [
                        {
                            label: 'Liczba zgłoszeń',
                            data: complaintsData,
                            fill: false,
                            backgroundColor: documentStyle.getPropertyValue('--green-600'),
                            borderColor: documentStyle.getPropertyValue('--green-600'),
                            tension: .4
                        }
                    ]
                };
            },
            (error: any) => console.error('Error fetching complaints by month', error)
        )
    }


    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        // this.chartData = {
        //     labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
        //     datasets: [
        //         {
        //             label: 'First Dataset',
        //             data: [65, 59, 80, 81, 56, 55, 40],
        //             fill: false,
        //             backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
        //             borderColor: documentStyle.getPropertyValue('--bluegray-700'),
        //             tension: .4
        //         }
        //     ]
        // };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
