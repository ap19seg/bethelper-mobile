import { ApplicationSettingsService } from './../application-settings.service';
import { BetService } from './../bet.service';
import { SaveBetsService } from './../save-bets.service';
import { Component, OnInit } from '@angular/core';
import { Bet } from '../model/bet';
import { localize } from "nativescript-localize";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures";
import { Color } from 'tns-core-modules/color/color';

@Component({
    selector: 'saved-bets',
    templateUrl: './saved-bets.component.html',
    styleUrls: ['./saved-bets.component.scss']
})
export class SavedBetsComponent implements OnInit {

    constructor(protected saveBetsService: SaveBetsService, private betService: BetService, private applicationSettingsService: ApplicationSettingsService) { }

    ngOnInit() {
    }

    getDate(bet: Bet): String {
        return bet.date.getDate() + "." + (bet.date.getMonth() + 1) + "." + bet.date.getFullYear();
    }

    onOpenIconTap(bet: Bet) {
        for (const tip of bet.tips) {
            tip.markedAsWin = true;
        }
        this.betService.tips = Object.assign([], bet.tips);
        this.betService.calculateWinnings();
        this.applicationSettingsService.saveLastEditedBet(this.betService.tips);
    }

    onTrashIconTap(bet: Bet) {
        this.saveBetsService.removeBet(bet);
    }

    onIconTouch(args: TouchGestureEventData) {
        let icon = args.view;
        switch (args.action) {
            case 'down':
                icon.color = new Color("rgb(200, 200, 200)");
                break;
            case 'up':
                icon.color = new Color("rgb(255, 255, 255)");
                break;
        }
    }


}
