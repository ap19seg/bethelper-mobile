import { CombinationbetService } from './combinationbet.service';
import { FileSystemService } from './filesystem.service';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Bet } from './model/bet';
import { Tip } from './model/tip';

@Injectable({
    providedIn: 'root'
})
export class SaveBetsService implements OnInit {

    saveBetDialogSuccessMessageShown = false;

    bets = new Array<Bet>();

    constructor(private fileSystemService: FileSystemService, private combinationBetService:CombinationbetService) {
        this.fileSystemService.readFile().then(
            (res) => {
                if (res) {
                    this.bets = JSON.parse(res);
                    for (const bet of this.bets) {
                        bet.date = new Date(bet.date);
                    }
                    console.log("result");
                    console.log("file read successfully");
                } else{
                    console.log("empty file");
                }
            });
    }

    ngOnInit(): void {
    }

    addBet(bet: Bet) {
        this.bets.push(bet);
        this.fileSystemService.writeFile(bet);
    }

    containsName(name:string): boolean{
        for (const bet of this.bets) {
            if(name == bet.name){
                return true;
            }
        }
        return false;
    }

    removeBet(bet: Bet) {
        this.bets.splice(this.bets.indexOf(bet), 1);
        this.fileSystemService.removeBetFromFile(bet);
    }

}
