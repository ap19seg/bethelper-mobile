import { ApplicationSettingsService } from './application-settings.service';
import { FileSystemService } from './filesystem.service';
import { localize } from 'nativescript-localize';
import { CombinationbetService } from './combinationbet.service';
import { Sport } from './model/sport';
import { Tip } from './model/tip';
import { Injectable, OnInit } from '@angular/core';
import { CombinationBet } from './model/combinationBet';

@Injectable({
    providedIn: 'root'
})
export class BetService implements OnInit {

    constructor(private combinationBetService: CombinationbetService, private fileSystemService:FileSystemService, private applicationSettingsService:ApplicationSettingsService) {
    };

    public tips = new Array<Tip>();

    public stake = 10;

    combinationBets = new Array<CombinationBet>();

    ngOnInit(): void {
    }

    getCombinationBets(): Array<CombinationBet> {
        return this.combinationBets;
    }

    addTip(tip: Tip) {
        for (const tip of this.tips) {
            tip.markedAsWin = true;
        }
        if (tip.outcome == tip.outcomeDefault) {
            tip.outcome = "";
        }
        this.tips.push(tip);
        this.calculateWinnings();
        this.applicationSettingsService.saveLastEditedBet(this.tips);

    }

    loadLastEditedBets(){
        this.tips = this.applicationSettingsService.loadLastEditedBet();
    }

    removeTip(tip: Tip) {
        this.tips.splice(this.tips.indexOf(tip), 1);
        for (const tip of this.tips) {
            tip.markedAsWin = true;
        }
        this.calculateWinnings();
        this.applicationSettingsService.saveLastEditedBet(this.tips);
    }

    getTips() {
        return this.tips;
    }

    calculateWinnings() {

        this.stake = Number(this.stake);
        // Trennung falsche und richtige Tips
        if (!this.tips || this.tips.length <= 0) {
            this.combinationBets = new Array<CombinationBet>();
        } else {
            let availableCombinationBets = this.combinationBetService.getAvailableCombinationBets(
                this.tips.length
            );
            for (const combinationBet of availableCombinationBets) {

                if (!combinationBet.minimumCombinationSize) {
                    let winnings = -this.stake;
                    if (combinationBet.name == localize("combinationbet_single_name")) {
                        let stakePerBet = this.stake / this.tips.length;
                        this.tips.forEach(tip => {
                            if (tip.markedAsWin) {
                                winnings += stakePerBet * tip.odds;
                            }
                        });
                        combinationBet.winnings = winnings;
                    } else if (combinationBet.name == localize("combinationbet_combination_name")) {
                        let multiplicator = 1;
                        let allTipsFalse = false;
                        this.tips.forEach(tip => {
                            if (tip.markedAsWin) {
                                multiplicator *= tip.odds;
                            } else {
                                multiplicator = 0;
                            }
                        });
                        combinationBet.winnings = winnings + this.stake * multiplicator;
                    }
                } else {


                    // Einsatz pro Wette
                    let stakePerBet: number;
                    if (combinationBet.numberOfBets) {
                        stakePerBet = this.stake / combinationBet.numberOfBets;
                    } else {
                        let numberOfTips = this.combinationBetService.binomialCoefficient(this.tips.length, combinationBet.minimumCombinationSize);
                        stakePerBet = this.stake / numberOfTips;
                        combinationBet.name += "/" + numberOfTips;

                    }

                    // init winnigs
                    let winnings = -this.stake;
                    let allBetsForCombinationBet: Tip[][][] = [];

                    // Einzelwetten
                    if (combinationBet.minimumCombinationSize <= 1) {
                        this.tips.forEach(tip => {
                            if (tip.markedAsWin) {
                                winnings += stakePerBet * tip.odds;
                            }
                        });

                        combinationBet.minimumCombinationSize += 1;
                    }

                    // Alle Wetten sammeln
                    for (
                        let i = combinationBet.minimumCombinationSize;
                        i <= combinationBet.maximumCombinationSize;
                        i++
                    ) {
                        allBetsForCombinationBet.push(
                            this.combinationBetService.getSubsetCombinations(this.tips, i)
                        );
                    }

                    // Gewinn berechnen
                    allBetsForCombinationBet.forEach(currentArrayOfSubsets => {
                        currentArrayOfSubsets.forEach(currentArrayOfBets => {
                            let multiplicator = 1;

                            currentArrayOfBets.forEach(tip => {
                                multiplicator *= tip.odds;
                            });

                            winnings += multiplicator * stakePerBet;
                        });
                    });

                    combinationBet.winnings = winnings;
                }
            }

            // Rundungsfehler entfernen
            for (const combinationBet of availableCombinationBets) {
                if (combinationBet.winnings > -0.01 && combinationBet.winnings < 0.01 ) {
                    combinationBet.winnings = 0;
                }
            }
            this.combinationBets = availableCombinationBets;
        }
    }
}

