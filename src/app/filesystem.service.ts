import { Observable } from "tns-core-modules/data/observable";
import { Injectable } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
// >> fs-create-import
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { Tip } from "./model/tip";
import { exitEvent, displayedEvent, ApplicationEventData, LaunchEventData, OrientationChangedEventData, UnhandledErrorEventData, on as applicationOn, run as applicationRun } from "tns-core-modules/application";
import { SwipeActionsEventData } from 'nativescript-ui-listview';
import { Bet } from "./model/bet";

// << fs-create-import


@Injectable({
    providedIn: "root"
})
export class FileSystemService {

    constructor() { };

    fileRead = false;
    fileName = "savedBets.json";
    documents: Folder = <Folder>knownFolders.documents();
    folder: Folder = <Folder>this.documents.getFolder("betData");
    file: File = <File>this.folder.getFile(this.fileName);

    writeFile(bet:Bet) {
        this.readFile().then((res)=>{
            let bets: Array<Bet>;
            if(res){
                bets = JSON.parse(res) as Array<Bet>;
            } else{
                bets = new Array<Bet>();
            }
            bets.push(bet);
            return this.file.writeText(JSON.stringify(bets))
                .then((result) => { console.log("write success")}).catch((err) => { console.log("write error") });
        })
    }

    readFile(){
        if (File.exists(this.file.path)){
            return this.file.readText().then((res) => { return res });
        }
    }

    removeBetFromFile(bet:Bet) {
        this.readFile().then((res)=>{
            let bets: Array<Bet>;
            if(res){
                bets = JSON.parse(res) as Array<Bet>;
            } else{
                bets = new Array<Bet>();
            }
            let indexToRemove = -1;
            for (const betTemp of bets) {
                if(bet.name == betTemp.name){
                    indexToRemove = bets.indexOf(bet);
                    break;
                }
            }
            bets.splice(indexToRemove);
            return this.file.writeText(JSON.stringify(bets))
                .then((result) => { console.log("write success")}).catch((err) => { console.log("write error") });
        })
    }


}






