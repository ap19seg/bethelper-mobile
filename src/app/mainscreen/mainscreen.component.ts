import { FightersLoaderService } from './../fighters-loader.service';
import { ApplicationSettingsService } from './../application-settings.service';
import { LoadBetModalComponent } from './../load-bet-modal/load-bet-modal.component';
import { ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { SaveBetComponent } from '../save-bet-modal/save-bet-modal.component';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { CombinationBet } from '../model/combinationBet';
import { TipService } from './../tip.service';
import { CombinationbetService } from './../combinationbet.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, ElementRef, ViewContainerRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Tip } from '../model/tip';
import { BetService } from './../bet.service';
import {  Color } from 'tns-core-modules/ui/page/page';
import { TouchGestureEventData } from "tns-core-modules/ui/gestures";

declare const CGSizeMake: any;
declare const android: any;

const url = 'https://www.bloodyelbow.com/2013/1/29/3928296/ufc-roster-current-list-fighters';

@Component({
    selector: 'mainscreen',
    moduleId: module.id,
    providers: [ModalDialogService],
    templateUrl: './mainscreen.component.html',
    styleUrls: ['./mainscreen.component.scss']
})
export class MainscreenComponent implements AfterViewInit, AfterContentInit {

    @ViewChild('tipsScrollView', { static: true }) private scrollView: ElementRef;

    @ViewChild('addButton', {static: false}) private addButton: ElementRef;

    combinationBets: Array<CombinationBet>;

    buttonDown = false;

    switchReady = false;

    switchChangeDetectorCalled = false;

    constructor(protected betService: BetService, protected combinationBetService: CombinationbetService, protected tipService: TipService, private changeDetectorRef: ChangeDetectorRef, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef, private applicationSettingsService: ApplicationSettingsService, private fightersLoaderService: FightersLoaderService) {
        if (fightersLoaderService.fighters.length <= 0) {
            fightersLoaderService.loadFighters();
        }
        for (const tip of this.betService.tips) {
            tip.markedAsWin = true;
        }
        this.betService.calculateWinnings();

    }


    saveIconTap() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {}
        };
        this.modalService.showModal(SaveBetComponent, options);
    }

    showLoadBetModal() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {}
        };
        this.modalService.showModal(LoadBetModalComponent, options);
    }

    ngAfterViewInit(): void {
        if (this.applicationSettingsService.showLoadBetDialog) {
            // Only consider showing it once
            this.applicationSettingsService.showLoadBetDialog = false;
            if (this.applicationSettingsService.hasBet()) {
                setTimeout(() => {
                    this.showLoadBetModal();
                }, 400);
            }
        }
        setTimeout(() => {
            this.scrollView.nativeElement.scrollToVerticalOffset(this.scrollView.nativeElement.scrollableHeight, false);
        }, 150);
    }

    ngAfterContentInit(): void {
    }

    winLossSwitchChange(eventData: TouchGestureEventData, tip: Tip) {
        if (!this.isUndefined(tip)) {
            tip.markedAsWin = !tip.markedAsWin;
            if (tip.markedAsWin) {
                eventData.object.set("color", new Color("rgb(0, 170, 120)"));
            } else {
                eventData.object.set("color", new Color("rgb(140, 0, 70)"));
            }
            this.betService.calculateWinnings();
        }
    }

    protected get shadowColor(): Color {
        return new Color('#888888');
    }

    protected get shadowOffset(): number {
        return 2.0;
    }

    removeTip(tip:Tip){
        this.changeDetectorRef.detectChanges();
        this.betService.removeTip(tip);
        this.changeDetectorRef.detectChanges();
    }


    onButtonTouch(args: TouchGestureEventData) {
        let button = args.view;
        switch (args.action) {
            case 'down':
                button.className = "add-button add-button-down";
                break;
            case 'up':
                button.className = "add-button";
                break;
        }
    }

    onActionbarIconTouch(args: TouchGestureEventData){
        let label = args.view;
        switch (args.action) {
            case 'down':
                label.color = new Color("rgb(180, 180, 180)");
                break;
            case 'up':
                label.color = new Color("rgb(255, 255, 255)");
                break;
        }
    }

    onSaveIconTouch(args: TouchGestureEventData) {
        let label = args.view;
        switch (args.action) {
            case 'down':
                label.color = new Color("rgb(170, 135, 35)");
                break;
            case 'up':
                label.color = new Color("rgb(231, 169, 47)");
                break;
        }
    }

    onConfigureTipTouch(args: TouchGestureEventData) {
        let label = args.view;
        switch (args.action) {
            case 'down':
                label.color = new Color("rgb(160,160,160)");
                break;
            case 'up':
                label.color = new Color("rgb(230,230,230)");
                break;
        }
    }

    onDeleteTipTouch(args: TouchGestureEventData) {
        let label = args.view;
        switch (args.action) {
            case 'down':
                label.color = new Color("red");
                break;
            case 'up':
                label.color = new Color("rgb(230,230,230)");
                break;
        }
    }

    onLoaded(args) {
        let tnsView = <any>args.object;
        if (tnsView.android) {
            let nativeAnView = tnsView.android;
            var shape = new android.graphics.drawable.GradientDrawable();
            shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
            shape.setColor(android.graphics.Color.parseColor("#30bcff"));
            nativeAnView.setBackgroundDrawable(shape);
            nativeAnView.setElevation(20);
        } else if (tnsView.ios) {
            let nativeView = tnsView.ios;
            nativeView.layer.shadowColor = this.shadowColor.ios.CGColor;
            nativeView.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
            nativeView.layer.shadowOpacity = 0.5;
            nativeView.layer.shadowRadius = 5.0;
        }
    }


    opponentsEmpty(tip: Tip): boolean {
        if (!this.isUndefined(tip)) {
            return tip.opponent1 == "" && tip.opponent2 == "";
        }
    }

    getMarkedAsWin(tip: Tip) {
        if(!this.isUndefined(tip)){
            return tip.markedAsWin;
        } else{
            return true;
        }
    }

    getOpponent1(tip: Tip) {
        if (!this.isUndefined(tip)) {
            return tip.opponent1;
        } else{
            return "";
        }
    }

    getOpponent2(tip: Tip) {
        if (!this.isUndefined(tip)) {
            return tip.opponent2;
        } else{
            return "";
        }
    }

    getOdds(tip: Tip) {
        if (!this.isUndefined(tip)) {
            return tip.odds;
        } else{
            return 0;
        }
    }

    getOutcome(tip: Tip) {
        if (!this.isUndefined(tip)) {
            return tip.outcome;
        }else{
            return "";
        }
    }

    getSport(tip: Tip) {
        if (!this.isUndefined(tip)) {
            return tip.sport;
        }else{
            return "";
        }
    }

    getDate(tip: Tip) {
        if (!this.isUndefined(tip)) {
            return tip.date;
        }else{
            return "";
        }
    }



    isUndefined(obj: Object) {
        return typeof obj == 'undefined';
    }

    onConfigureTipTap(tip: Tip) {
        let copyOfTip = new Tip(tip);
        this.tipService.indexOfConfiguredTip = this.betService.tips.indexOf(tip);
        delete this.betService.tips[this.betService.tips.indexOf(tip)];
        if (copyOfTip.outcome == "") {
            copyOfTip.outcome = copyOfTip.outcomeDefault;
        }
        this.tipService.tip = copyOfTip;
        this.tipService.tipBeforeConfiguration = new Tip(copyOfTip);
    }

    // shortens the number of decimal placers for high numbers
    getWinnings(combinationBet: CombinationBet) {
        if (combinationBet.winnings < 10000) {
            return combinationBet.winnings.toFixed(2);
        } else if (combinationBet.winnings >= 10000 && combinationBet.winnings < 100000) {
            return combinationBet.winnings.toFixed(1);
        } else {
            return combinationBet.winnings.toFixed(0);
        }
    }

    onAddButtonTap() {
        this.switchReady = false;
        this.tipService.tipBeforeConfiguration = null;
    }




}
