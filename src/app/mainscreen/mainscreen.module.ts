import { LoadBetModalComponent } from './../load-bet-modal/load-bet-modal.component';
import { SaveBetComponent } from '../save-bet-modal/save-bet-modal.component';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { MainscreenComponent } from './mainscreen.component';
import { MainscreenRoutingModule } from './mainscreen-routing.module';
import { NativeScriptLocalizeModule } from 'nativescript-localize/angular';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        MainscreenRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        NativeScriptLocalizeModule
    ],
    declarations: [
        MainscreenComponent,
        SaveBetComponent,
        LoadBetModalComponent

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        SaveBetComponent,
        LoadBetModalComponent

    ]
})
export class MainscreenModule { }
