import { Tip } from './../model/tip';
import { BetService } from './../bet.service';
import { ApplicationSettingsService } from './../application-settings.service';
import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: 'load-bet-modal',
    templateUrl: './load-bet-modal.component.html',
    styleUrls: ['./load-bet-modal.component.scss']
})
export class LoadBetModalComponent implements OnInit {

    constructor(private params: ModalDialogParams, private betService:BetService, private applicationSettingsService:ApplicationSettingsService) { }

    ngOnInit() {
    }

    loadBetNoButtonTap() {
        this.betService.tips = new Array<Tip>();
        this.applicationSettingsService.saveLastEditedBet(new Array<Tip>());
        this.params.closeCallback();
    }

    loadBetYesButtonTap() {
        this.betService.loadLastEditedBets();
        this.params.closeCallback();
        this.betService.calculateWinnings();
    }

}
