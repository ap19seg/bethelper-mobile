import { BetService } from './bet.service';
import { Injectable } from '@angular/core';
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "tns-core-modules/application-settings";
import { Tip } from './model/tip';

@Injectable({
    providedIn: 'root'
})
export class ApplicationSettingsService {

    lastEditedBetName = "lastEditedBet";
    // Variable to only consider showing it when the app gets started
    showLoadBetDialog = true;

    constructor() { }

    saveLastEditedBet(tips: Array<Tip>) {
        setString(this.lastEditedBetName, JSON.stringify(tips));
    }

    loadLastEditedBet(): Array<Tip> {
        let tips = JSON.parse(getString(this.lastEditedBetName)) as Array<Tip>;
        for (const tip of tips) {
            tip.markedAsWin = true;
        }
        return tips;
    }

    hasBet(): boolean {
        if (getString(this.lastEditedBetName) && JSON.parse(getString(this.lastEditedBetName)).length > 0) {
            return true;
        } else {
            return false;
        }
    }
}
