import { AppModule } from './app.module';
import { Tip} from './model/tip';
import { Injectable } from '@angular/core';
import { localize } from "nativescript-localize";

@Injectable({
    providedIn: 'root'
})
export class TipService {

    tip = new Tip();
    tipBeforeConfiguration = null;

    indexOfConfiguredTip = -1

    drawOutcome = this.getOutcomeSuffix(OutcomeSuffixEnum.draw);
    opponentOneWinsByOutcomes = new Array<string>();
    opponentOneWinsInRoundOutcomes = new Array<string>();
    opponentTwoWinsByOutcomes = new Array<string>();
    opponentTwoWinsInRoundOutcomes = new Array<string>();
    fightLengthOutcomes = [
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsLessThanOneAndHalfRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsMoreThanOneAndHalfRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsLessThanTwoAndHalfRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsMoreThanTwoAndHalfRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsLessThanThreeAndHalfRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsMoreThanThreeAndHalfRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsLessThanFourAndHalfRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsMoreThanFourAndHalfRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsLessThanFiveRounds),
        this.getOutcomeSuffix(OutcomeSuffixEnum.fightLastsFiveRounds)
    ];

    public date = new Date();

    private outcomeSuffixEnumArray = [
        this.getOutcomeSuffix(OutcomeSuffixEnum.win),
        this.getOutcomeSuffix(OutcomeSuffixEnum.winByKnockoutOrDisqualification),
        this.getOutcomeSuffix(OutcomeSuffixEnum.winByDecision),
        this.getOutcomeSuffix(OutcomeSuffixEnum.winBySubmission),
        this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound1),
        this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound2),
        this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound3),
        this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound4),
        this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound5)
    ];

    constructor() { }

    // Wetten auf Siegart Kämpfer 1
    getOpponentOneWinsByOutcomes(): Array<string>{
        let possibleOutcomes = new Array<string>();
        if(this.tip.opponent1 && this.tip.opponent1 != ""){
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.win));
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winByDecision));
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winByKnockoutOrDisqualification));
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winBySubmission));
        }
        return possibleOutcomes;
    }

    // Wetten auf Sieg in Runde Kämpfer 1
    getOpponentOneWinsInRoundOutcomes(): Array<string>{
        let possibleOutcomes = new Array<string>();
        if(this.tip.opponent1 && this.tip.opponent1 != ""){
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound1));
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound1));
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound1));
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound1));
            possibleOutcomes.push(this.tip.opponent1 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound1));
        }
        return possibleOutcomes;
    }

    // Wetten auf Siegart Kämpfer 1
    getOpponentTwoWinsByOutcomes(): Array<string>{
        let possibleOutcomes = new Array<string>();
        if(this.tip.opponent2 && this.tip.opponent2 != ""){
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.win));
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winByDecision));
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winByKnockoutOrDisqualification));
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winBySubmission));
        }
        return possibleOutcomes;
    }

    // Wetten auf Sieg in Runde Kämpfer 1
    getOpponentTwoWinsInRoundOutcomes(): Array<string>{
        let possibleOutcomes = new Array<string>();
        if(this.tip.opponent2 && this.tip.opponent2 != ""){
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound1));
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound2));
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound3));
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound4));
            possibleOutcomes.push(this.tip.opponent2 + " " + this.getOutcomeSuffix(OutcomeSuffixEnum.winInRound5));
        }
        return possibleOutcomes;
    }

    getOutcomeSuffix(outcomeSuffixEnum:OutcomeSuffixEnum):string{
        let outcomeSuffix = "";
        switch (outcomeSuffixEnum) {
            case OutcomeSuffixEnum.draw:
                outcomeSuffix = localize("outcome_draw");
                break;
            case OutcomeSuffixEnum.win:
                outcomeSuffix = localize("outcome_win");
                break;
            case OutcomeSuffixEnum.winByKnockoutOrDisqualification:
                outcomeSuffix = localize("outcome_win_by_knockout_or_disqualification");
                break;
            case OutcomeSuffixEnum.winByDecision:
                outcomeSuffix = localize("outcome_win_by_decision");
                break;
            case OutcomeSuffixEnum.winBySubmission:
                outcomeSuffix = localize("outcome_win_by_submission");
                break;
            case OutcomeSuffixEnum.winInRound1:
                outcomeSuffix = localize("outcome_win_in_round1");
                break;
            case OutcomeSuffixEnum.winInRound2:
                outcomeSuffix = localize("outcome_win_in_round2");
                break;
            case OutcomeSuffixEnum.winInRound3:
                outcomeSuffix = localize("outcome_win_in_round3");
                break;
            case OutcomeSuffixEnum.winInRound4:
                outcomeSuffix = localize("outcome_win_in_round4");
                break;
            case OutcomeSuffixEnum.winInRound5:
                outcomeSuffix = localize("outcome_win_in_round5");
                break;
            case OutcomeSuffixEnum.fightLastsMoreThanOneAndHalfRounds:
                outcomeSuffix = localize("outcome_fight_lasts_more_than_1_and_half_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsMoreThanTwoAndHalfRounds:
                outcomeSuffix = localize("outcome_fight_lasts_more_than_2_and_half_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsMoreThanThreeAndHalfRounds:
                outcomeSuffix = localize("outcome_fight_lasts_more_than_3_and_half_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsMoreThanFourAndHalfRounds:
                outcomeSuffix = localize("outcome_fight_lasts_more_than_4_and_half_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsFiveRounds:
                outcomeSuffix = localize("outcome_fight_lasts_5_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsLessThanOneAndHalfRounds:
                outcomeSuffix = localize("outcome_fight_lasts_less_than_1_and_half_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsLessThanTwoAndHalfRounds:
                outcomeSuffix = localize("outcome_fight_lasts_less_than_2_and_half_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsLessThanThreeAndHalfRounds:
                outcomeSuffix = localize("outcome_fight_lasts_less_than_3_and_half_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsLessThanFourAndHalfRounds:
                outcomeSuffix = localize("outcome_fight_lasts_less_than_4_and_half_rounds");
                break;
            case OutcomeSuffixEnum.fightLastsLessThanFiveRounds:
                outcomeSuffix = localize("outcome_fight_lasts_less_than_5_rounds");
                break;
            default:
                break;
        }
        return outcomeSuffix;
    }


}



export enum OutcomeSuffixEnum {
    draw,
    win,
    winByKnockoutOrDisqualification,
    winByDecision,
    winBySubmission,
    winInRound1,
    winInRound2,
    winInRound3,
    winInRound4,
    winInRound5,
    fightLastsMoreThanOneAndHalfRounds,
    fightLastsMoreThanTwoAndHalfRounds,
    fightLastsMoreThanThreeAndHalfRounds,
    fightLastsMoreThanFourAndHalfRounds,
    fightLastsFiveRounds,
    fightLastsLessThanOneAndHalfRounds,
    fightLastsLessThanTwoAndHalfRounds,
    fightLastsLessThanThreeAndHalfRounds,
    fightLastsLessThanFourAndHalfRounds,
    fightLastsLessThanFiveRounds,
}
