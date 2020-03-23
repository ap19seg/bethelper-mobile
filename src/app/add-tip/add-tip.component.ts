import { FightersLoaderService } from './../fighters-loader.service';
import { OutcomePickerModalComponent } from '../outcome-picker-modal/outcome-picker-modal.component';
import { DatePickerModalComponent } from '../date-picker-modal/date-picker-modal.component';
import { TipService } from './../tip.service';
import { Tip } from '../model/tip';
import { Component, ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import { BetService } from './../bet.service';
import * as utils from "tns-core-modules/utils/utils";
import { EventData } from 'tns-core-modules/ui/page/page';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { localize } from "nativescript-localize";
import { RadAutoCompleteTextViewComponent } from 'nativescript-ui-autocomplete/angular/autocomplete-directives';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { TokenModel } from 'nativescript-ui-autocomplete';

@Component({
    selector: 'bethelper-add-tip',
    moduleId: module.id,
    providers: [ModalDialogService],
    templateUrl: './add-tip.component.html',
    styleUrls: ['./add-tip.component.scss']
})
export class AddTipComponent {

    protected showError = false; // view-specific field to manage the visibility of the error-messages
    protected _fighterNameTokens: ObservableArray<TokenModel>;
    // Fields to distinguish which autocomplete field got updated
    protected opponent1 = "opponent1";
    protected opponent2 = "opponent2";
    private fighterNames = new Array<string>();


    // init autocomplete
    @ViewChild("opponent1Autocomplete", { static: false }) opponent1Autocomplete: RadAutoCompleteTextViewComponent;
    @ViewChild("opponent2Autocomplete", { static: false }) opponent2Autocomplete: RadAutoCompleteTextViewComponent;

    @ViewChild("opponent1Autocomplete", { static: false }) opponent1Ref: ElementRef;
    @ViewChild("opponent2Autocomplete", { static: false }) opponent2Ref: ElementRef;

    @ViewChild("oddsInput", { static: false }) oddsInput: ElementRef;

    constructor(protected betService: BetService, protected tipService: TipService, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef, protected fightersLoaderService: FightersLoaderService) {
        this.initFighters();

    }

    // init fighters for autocomplete
    initFighters() {
        this.fighterNames = this.fightersLoaderService.fighters;
        this.initDataItems();
    }

    // init tokens for autocomplete
    private initDataItems() {
        this._fighterNameTokens = new ObservableArray<TokenModel>();

        for (let i = 0; i < this.fighterNames.length; i++) {
            this._fighterNameTokens.push(new TokenModel(this.fighterNames[i], undefined));
        }
    }

    get fighterNameTokens():ObservableArray<TokenModel>{
        return this._fighterNameTokens;
    }

    resetTip() {
        this.tipService.tip = new Tip();
    }

    // hides keyboard
    dismissSoftInput(args: EventData) {
        utils.ad.dismissSoftInput();
    }

    // renders date-picker-modal
    showDatePicker() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {}
        };
        this.modalService.showModal(DatePickerModalComponent, options);
    }


    // renders outcome-picker-modal
    showOutcomePicker() {
        // refresh outcomes that contain a opponent name
        this.tipService.opponentOneWinsByOutcomes = this.tipService.getOpponentOneWinsByOutcomes();
        this.tipService.opponentOneWinsInRoundOutcomes = this.tipService.getOpponentOneWinsInRoundOutcomes();
        this.tipService.opponentTwoWinsByOutcomes = this.tipService.getOpponentTwoWinsByOutcomes();
        this.tipService.opponentTwoWinsInRoundOutcomes = this.tipService.getOpponentTwoWinsInRoundOutcomes();

        if (this.tipService.tip.opponent1 && this.tipService.tip.opponent1 != "" && this.tipService.tip.opponent1 != "Please insert Name"
            && this.tipService.tip.opponent2 && this.tipService.tip.opponent2 != "" && this.tipService.tip.opponent2 != "Please insert Name") {
            const options: ModalDialogOptions = {
                viewContainerRef: this.viewContainerRef,
                fullscreen: false,
                context: {}
            };
            this.modalService.showModal(OutcomePickerModalComponent, options);
        } else {
            this.showError = true;
        }
    }

    /**
     *  Below are functions, that are being called when events get triggered from View-Components
    */
    onOpponentAutocompleteTextChanged(eventData: EventData, opponent: string) {
        this.initDataItems();
        if(opponent == this.opponent1){
            if(this.opponent1Autocomplete.nativeElement.suggestionView.visibility == "hidden"){
                this.opponent1Autocomplete.nativeElement.suggestionView.visibility = "visible";
            }
        }
        if(opponent == this.opponent2){
            if(this.opponent2Autocomplete.nativeElement.suggestionView.visibility == "hidden"){
                this.opponent2Autocomplete.nativeElement.suggestionView.visibility = "visible";
            }
        }
        switch (opponent) {
            case this.opponent1:
                if (this.tipService.tip.outcome.indexOf(this.tipService.tip.opponent1) != -1
                    && this.tipService.tip.opponent1 != eventData.object.get("text")) {
                    this.tipService.tip.outcome = localize("outcomepicker_default_value");
                }
                let oldOpponent1Name = this.tipService.tip.opponent1;
                let newOpponent1Name= eventData.object.get("text");
                if((newOpponent1Name.length - oldOpponent1Name.length) > 1 || (newOpponent1Name.length - oldOpponent1Name.length) < -1){
                    this.clearFocus(this.opponent1);
                }
                this.tipService.tip.opponent1 = newOpponent1Name;
                break;
            case this.opponent2:
                if (this.tipService.tip.outcome.indexOf(this.tipService.tip.opponent2) != -1
                    && this.tipService.tip.opponent2 != eventData.object.get("text")) {
                    this.tipService.tip.outcome = localize("outcomepicker_default_value");
                }
                let oldOpponent2Name = this.tipService.tip.opponent2;
                let newOpponent2Name= eventData.object.get("text");
                if((newOpponent2Name.length - oldOpponent2Name.length) > 1 || (newOpponent2Name.length - oldOpponent2Name.length) < -1){
                    this.clearFocus(this.opponent1);
                }
                this.tipService.tip.opponent2 = newOpponent2Name;
                break;
        }
        this.showError = false;
    }

    clearFocus(opponent: string) {
        switch (opponent) {
            case this.opponent1:
                if (this.opponent1Autocomplete.nativeElement.android) {
                    this.opponent1Autocomplete.nativeElement.android.clearFocus();
                    utils.ad.dismissSoftInput();
                }
                break;
            case this.opponent2:
                if (this.opponent1Autocomplete.nativeElement.android) {
                    this.opponent1Autocomplete.nativeElement.android.clearFocus();
                    utils.ad.dismissSoftInput();
                }
                break;
        }

    }


    onOpponentLoaded(eventData: EventData, opponent: string) {
        if (this.tipService.tip.opponent1.length > 0) {
            this.opponent1Autocomplete.nativeElement.text = this.tipService.tip.opponent1;
            this.opponent1Autocomplete.nativeElement.suggestionView.visibility = "hidden";
        }
        if (this.tipService.tip.opponent2.length > 0) {
            this.opponent2Autocomplete.nativeElement.text = this.tipService.tip.opponent2;
            this.opponent2Autocomplete.nativeElement.suggestionView.visibility = "hidden";
        }
        if (this.tipService.tip.opponent1.length > 0 || this.tipService.tip.opponent2.length > 0) {
            this.oddsInput.nativeElement.focus();
        }
    }

    onOddsInputTextChange() {
        this.showError = false;
    }

    onOutcomeButtonTap() {
        this.showError = false;
        this.showOutcomePicker();
    }

    onDateButtonTap() {
        this.showError = false;
        this.showDatePicker();
    }

    onOpponentInputTextChange() {
        this.showError = false;
    }

    addTipTap(tip: Tip) {
        this.tipService.tip.markedAsWin = true;
        this.tipService.tip.odds = Number(this.tipService.tip.odds);
        if (this.tipService.indexOfConfiguredTip > -1) {
            if (this.tipService.tip.outcome == this.tipService.tip.outcomeDefault) {
                this.tipService.tip.outcome = "";
            }
            this.betService.tips[this.tipService.indexOfConfiguredTip] = this.tipService.tip;
            this.tipService.indexOfConfiguredTip = -1;
            for (const tip of this.betService.tips) {
                tip.markedAsWin = true;
            }
        } else {
            this.betService.addTip(this.tipService.tip);
        }
        this.resetTip();
    }

    cancelTipConfigurationTap() {
        if (this.tipService.tipBeforeConfiguration != null) {
            this.tipService.tip = this.tipService.tipBeforeConfiguration;
        }
        this.tipService.tip.markedAsWin = true;
        // this.tipService.tip.odds = Number(this.tipService.tip.odds);
        if (this.tipService.indexOfConfiguredTip > -1) {
            if (this.tipService.tip.outcome == this.tipService.tip.outcomeDefault) {
                this.tipService.tip.outcome = "";
            }
            this.betService.tips[this.tipService.indexOfConfiguredTip] = this.tipService.tip;
            this.tipService.indexOfConfiguredTip = -1;
        }
        for (const tip of this.betService.tips) {
            tip.markedAsWin = true;
        }
        this.resetTip();
    }

}

export interface CharCountObject {
    lowerCaseCharCount: number,
    upperCaseCharCount: number,
    whitespaceCharCount: number
}
