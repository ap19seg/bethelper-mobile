import { FightersLoaderService } from './fighters-loader.service';
import { FileSystemService } from './filesystem.service';
import { Component, OnInit } from "@angular/core";


@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit{

    constructor(private fightersLoaderService:FightersLoaderService){}

    ngOnInit(): void {
        // this.fightersLoaderService.loadFighters();
    }


}

