import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { NativeScriptDateTimePickerModule } from "nativescript-datetimepicker/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { SavedBetsComponent } from './saved-bets/saved-bets.component';
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptDateTimePickerModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptLocalizeModule,
        NativeScriptUIAutoCompleteTextViewModule
    ],
    declarations: [
        AppComponent,
        SavedBetsComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
