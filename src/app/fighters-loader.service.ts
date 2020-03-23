import { Injectable } from '@angular/core';

const url = 'https://www.bloodyelbow.com/2013/1/29/3928296/ufc-roster-current-list-fighters';

@Injectable({
    providedIn: 'root'
})
export class FightersLoaderService {

    constructor() { }

    fighters = new Array<string>();

    loadingError = false;

    loadFighters(){
        return fetch(url)
            .then(res => res.text())
            .then(body => {
                this.getFighterNamesFromHTMLString(body);
                return this.fighters;
            })
            .catch((error) => this.loadingError = true);
    }

    getFighterNamesFromHTMLString(htmlString: string) {
        // substring the tables with the fighter names
        let substringWithData = htmlString.substring(htmlString.indexOf("Heavyweights"), htmlString.indexOf("Inactive Fighters"));

        this.extractAndPushFighterNames(substringWithData);
    }

    // recursive extraction of the fighter names
    extractAndPushFighterNames(substringWithData: string){

        let tdTag = "<td>";
        let tdClosingTag = "</td>";
        let fighterTableRowStart = '<tr align="CENTER"';

        // special characters in names
        let star = "*";
        // there's a whitespace in front of the arrow's if there's no star
        let arrowUp = " ↑";
        let arrowDown = " ↓";

        // substring from the start of the next fighter row
        let startsWithFighterString = substringWithData.substring(substringWithData.indexOf(fighterTableRowStart));

        // substring row for current fighter
        let fighterRow = startsWithFighterString.substring(0, startsWithFighterString.indexOf("</tr>"));

        // substring after image-tag
        let startsWithImage = fighterRow.substring(fighterRow.indexOf("<img"));

        // Ccut image-tag out
        let stringAfterImage = startsWithImage.substring(startsWithImage.indexOf(tdClosingTag) + tdClosingTag.length);

        // add fighter to list
        let fighterName = stringAfterImage.substring(stringAfterImage.indexOf(tdTag)+tdTag.length, stringAfterImage.indexOf(tdClosingTag));

        // remove special characters after the names
        if(fighterName.indexOf(star) != -1){
            fighterName = fighterName.substring(0,fighterName.indexOf(star));
        }
        if(fighterName.indexOf(arrowUp) != -1){
            fighterName = fighterName.substring(0,fighterName.indexOf(arrowUp));
        }
        if(fighterName.indexOf(arrowDown) != -1){
            fighterName = fighterName.substring(0,fighterName.indexOf(arrowDown));
        }

        this.fighters.push(fighterName);

        // get string after fighter name
        let stringAfterFighter = startsWithFighterString.substring(startsWithFighterString.indexOf(fighterName)+fighterName.length);

        // recursive call if there's still fighters left
        if(stringAfterFighter.indexOf(fighterTableRowStart) != -1){
            this.extractAndPushFighterNames(stringAfterFighter);
        }


    }


}
