import {Provider} from "../provider/provider";
import {Contractor} from "../contractor/contractor";
import {Note} from "./note";
import {Category} from "../category/category";

export class Complaint {
    id: number;
    factureId: string;
    dataOfReport: Date;
    dateOfPurchase: Date;
    productCode: string;
    contractorEntity: Contractor;
    categoryEntity: Category;
    providerEntity: Provider;
    dataOfReportAnswer: Date;
    username: string;
    surname: string;
    phoneNumber: string;
    email: string;
    status: string;
    notes: Note[];

    constructor(productCode: string,
                dataOfReport: Date,
                dataOfReportAnswer: Date,
                providerDTO: Provider,
                contractorDTO: Contractor,
                categoryDTO: Category,
                dateOfPurchase: Date,
                factureId: string,
                username: string,
                surname: string,
                phoneNumber: string,
                email: string,
                status: string) {
        this.productCode = productCode;
        this.dataOfReport = dataOfReport;
        this.dataOfReportAnswer = dataOfReportAnswer;
        this.categoryEntity = categoryDTO;
        this.providerEntity = providerDTO;
        this.contractorEntity = contractorDTO;
        this.dateOfPurchase = dateOfPurchase;
        this.factureId = factureId;
        this.username = username;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.status = status;
    }
}
