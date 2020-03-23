import { CombinationBet } from './model/combinationBet';
import { Tip } from './model/tip';
import { Injectable } from "@angular/core";
import { localize } from "nativescript-localize";

@Injectable({
    providedIn: "root"
})
export class CombinationbetService {
    OneTipBets: CombinationBet[] = [];
    TwoTipBets: CombinationBet[] = [];
    ThreeTipBets: CombinationBet[] = [];
    FourTipBets: CombinationBet[] = [];
    FiveTipBets: CombinationBet[] = [];
    SixTipBets: CombinationBet[] = [];
    SevenTipBets: CombinationBet[] = [];
    EightTipBets: CombinationBet[] = [];

    constructor() {
        this.initCombinationBets();
    }

    getSubsetCombinations(tips: Tip[], size: number) {
        let result = [];

        let recursiveSubset = function (n: number, source: Tip[], got: Tip[], all) {
            if (n === 0) {
                if (got.length > 0) {
                    all[all.length] = got;
                }
                return;
            }

            for (let j = 0; j < source.length; j++) {
                if (source[j].markedAsWin)
                    recursiveSubset(
                        n - 1,
                        source.slice(j + 1),
                        got.concat([source[j]]),
                        all
                    );
            }
            return;
        };

        recursiveSubset(size, tips, [], result);

        return result;
    }

    getAvailableCombinationBets(numberOfTips: number): Array<CombinationBet> {
        this.clearAvailableCombinationBets();
        this.initCombinationBets();
        switch (numberOfTips) {
            case 1:
                return this.OneTipBets;
            case 2:
                return this.TwoTipBets;
            case 3:
                return this.ThreeTipBets;
            case 4:
                return this.FourTipBets;
            case 5:
                return this.FiveTipBets;
            case 6:
                return this.SixTipBets;
            case 7:
                return this.SevenTipBets;
            case 8:
                return this.EightTipBets;
            default:
                return this.TwoTipBets;
        }
    }

    clearAvailableCombinationBets(){
        this.OneTipBets = [];
        this.TwoTipBets = [];
        this.ThreeTipBets = [];
        this.FourTipBets = [];
        this.FiveTipBets = [];
        this.SixTipBets = [];
        this.SevenTipBets = [];
        this.EightTipBets = [];
    }


    initCombinationBets() {
        const allTipsCombination = new CombinationBet(localize("combinationbet_combination_name"));
        const singleTips = new CombinationBet(localize("combinationbet_single_name"));
        const subsetsOfTwo = new CombinationBet("2", 2, 2);
        const subsetsOfThree = new CombinationBet("3", 3, 3);
        const subsetsOfFour = new CombinationBet("4", 4, 4);
        const subsetsOfFive = new CombinationBet("5", 5, 5);
        const subsetsOfSix = new CombinationBet("6", 6, 6);
        const subsetsOfSeven = new CombinationBet("7", 7, 7);
        const trixie = new CombinationBet("Trixie", 2, 3, 4);
        const patent = new CombinationBet("Patent", 1, 3, 7);
        const yankee = new CombinationBet("Yankee", 2, 4, 11);
        const lucky15 = new CombinationBet("Lucky15", 1, 4, 15);
        const canadian = new CombinationBet("Canadian", 2, 5, 26);
        const lucky31 = new CombinationBet("Lucky31", 1, 5, 31);
        const heinz = new CombinationBet("Heinz", 2, 6, 57);
        const lucky63 = new CombinationBet("Lucky63", 1, 6, 63);
        const superheinz = new CombinationBet("Super Heinz", 2, 7, 120);
        const goliath = new CombinationBet("Goliath", 2, 8, 247);

        this.OneTipBets = [singleTips];
        this.TwoTipBets = [singleTips, allTipsCombination];
        this.ThreeTipBets = [singleTips, allTipsCombination, subsetsOfTwo, trixie, patent];
        this.FourTipBets = [singleTips, allTipsCombination, subsetsOfTwo, subsetsOfThree, yankee, lucky15];
        this.FiveTipBets = [
            singleTips,
            allTipsCombination,
            subsetsOfTwo,
            subsetsOfThree,
            subsetsOfFour,
            canadian,
            lucky31
        ];
        this.SixTipBets = [
            singleTips,
            allTipsCombination,
            subsetsOfTwo,
            subsetsOfThree,
            subsetsOfFour,
            subsetsOfFive,
            heinz,
            lucky63
        ];
        this.SevenTipBets = [
            singleTips,
            allTipsCombination,
            subsetsOfTwo,
            subsetsOfThree,
            subsetsOfFour,
            subsetsOfFive,
            subsetsOfSix,
            superheinz
        ];
        this.EightTipBets = [
            singleTips,
            allTipsCombination,
            subsetsOfTwo,
            subsetsOfThree,
            subsetsOfFour,
            subsetsOfFive,
            subsetsOfSix,
            subsetsOfSeven,
            goliath
        ];
    }

    binomialCoefficient(n: number, k: number): number {
        const numerator = this.fact(n);
        const denominator = this.fact(n - k) * this.fact(k);
        return numerator / denominator;
    }

    // Factorial function.
    private fact(x: number): number {
        if (x === 0) {
            return 1;
        }

        return x * this.fact(x - 1);
    }
}
