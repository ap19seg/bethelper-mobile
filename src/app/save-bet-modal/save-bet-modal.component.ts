import { BetService } from '../bet.service';
import { SaveBetsService } from '../save-bets.service';
import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";
import * as utils from "tns-core-modules/utils/utils";
import { EventData } from 'tns-core-modules/ui/page/page';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Bet } from '../model/bet';

@Component({
    selector: 'save-bet-modal',
    templateUrl: './save-bet-modal.component.html',
    styleUrls: ['./save-bet-modal.component.scss']
})
export class SaveBetComponent implements OnInit {

    constructor(private params: ModalDialogParams, private saveBetsService: SaveBetsService, private betService: BetService) { }

    betName: string;
    showInputEmptyError = false;
    showNoBetsError = false;
    showBetNameAlreadyExistsError = false;
    showSuccessMessage = false;
    showActivityIndicator = false;

    ngOnInit() {
    }

    cancelButtonTap() {
        this.showInputEmptyError = false;
        this.showNoBetsError = false;
        this.showBetNameAlreadyExistsError = false;
        this.params.closeCallback();
    }

    saveButtonTap(args: EventData) {
        let textField = args.object as TextField;
        if (!this.betName || this.betName == "") {
            this.showInputEmptyError = true;
        } else if (!this.betService.tips || this.betService.tips.length < 1) {
            this.showNoBetsError = true;
            utils.ad.dismissSoftInput(textField.nativeView);
        } else if (this.saveBetsService.containsName(this.betName)) {
            this.showBetNameAlreadyExistsError = true;
            utils.ad.dismissSoftInput(textField.nativeView);
        } else {

            this.saveBet();
            this.showSuccess(textField);
        }
    }

    // remove error on input change
    betNameInputTextChange() {
        this.showInputEmptyError = false;
        this.showBetNameAlreadyExistsError = false;
    }

    // shows success and error
    showSuccess(textField: TextField) {
        let timeout = 2000;
        if (!this.saveBetsService.saveBetDialogSuccessMessageShown) {
            timeout = 5000;
        }
        utils.ad.dismissSoftInput(textField.nativeView); // dismiss keyboard
        // show message and activity indicator
        this.showSuccessMessage = true;
        this.showActivityIndicator = true;
        // reset values and close dialog
        setTimeout(() => {
            this.showSuccessMessage = false;
            this.showActivityIndicator = false;
            this.showNoBetsError = false;
            this.params.closeCallback();
        }, timeout);
    }

    saveBet() {
            let bet = new Bet(this.betName, new Date(), [...this.betService.tips]);
            this.saveBetsService.addBet(bet);
    }
}
