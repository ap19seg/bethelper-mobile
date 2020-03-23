import { TipService } from '../tip.service';
import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { EventData } from 'tns-core-modules/ui/page/page';
import { localize } from "nativescript-localize";

@Component({
  selector: 'outcome-picker-modal',
  templateUrl: './outcome-picker-modal.component.html',
  styleUrls: ['./outcome-picker-modal.component.scss']
})
export class OutcomePickerModalComponent implements OnInit {

    constructor(private params: ModalDialogParams, protected tipService: TipService) { }

    ngOnInit() {
    }

    close() {
      this.params.closeCallback();
  }

  setOutcome(eventData:EventData){
        this.tipService.tip.outcome = eventData.object.get("text");
        this.close();
  }

}
