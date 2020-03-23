import { NativeScriptLocalizeModule } from 'nativescript-localize/angular';
import { OutcomePickerModalComponent } from '../outcome-picker-modal/outcome-picker-modal.component';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AddTipRoutingModule } from "./add-tip-routing.module";
import { AddTipComponent } from "./add-tip.component";
import { DatePickerModalComponent } from "../date-picker-modal/date-picker-modal.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddTipRoutingModule,
        NativeScriptFormsModule,
        NativeScriptLocalizeModule
    ],
    declarations: [
        AddTipComponent,
        DatePickerModalComponent,
        OutcomePickerModalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        DatePickerModalComponent,
        OutcomePickerModalComponent
    ]
})
export class AddTipModule { }
