import { TipService } from '../tip.service';
import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";

@Component({
    selector: 'bethelper-date-picker',
    templateUrl: './date-picker-modal.component.html',
    styleUrls: ['./date-picker-modal.component.scss']
})
export class DatePickerModalComponent implements OnInit {

    constructor(private params: ModalDialogParams, private tipService: TipService) { }

    date = new Date();

    ngOnInit() {
    }

    close() {
        this.params.closeCallback();
    }

    setDate() {
        this.tipService.tip.date = this.date.getDate() + "." + (this.date.getMonth()+1) + "." + this.date.getFullYear();
        this.close();
    }

    onDateChanged(args) {
        this.date = args.value;
    }

}
