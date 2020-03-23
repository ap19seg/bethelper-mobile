import { Sport } from "./sport";
import { localize } from "nativescript-localize";

interface ITip{
    opponent1: string;
    opponent2: string;
    odds: number;
    date: string;
    sport: Sport;
    outcome: string;
    markedAsWin: boolean;
}

export class Tip {

    public outcomeDefault = localize("outcomepicker_default_value");

    public opponent1: string;
    public opponent2: string;
    public odds: number;
    public date: string;
    public sport: Sport;
    public outcome: string;
    public markedAsWin: boolean;


    constructor();
    constructor(obj: ITip);
    constructor(obj?: any) {
        this.opponent1 = obj && obj.opponent1 || "";
        this.opponent2 = obj && obj.opponent2 || "";
        this.odds = obj && obj.odds || 1;
        let date = new Date();
        this.date = obj && obj.date || date.getDate() + "." + (date.getUTCMonth() + 1) + "." + date.getFullYear();
        this.sport = obj && obj.sport || Sport.Ufc;
        this.outcome = obj && obj.outcome || localize("outcomepicker_default_value");
        this.markedAsWin = obj && obj.markedAsWin || true;
    }


}


