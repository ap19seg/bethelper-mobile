import { SavedBetsComponent } from './saved-bets/saved-bets.component';
import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/mainscreen", pathMatch: "full" },
    { path: "mainscreen", loadChildren: () => import("./mainscreen/mainscreen.module").then(m => m.MainscreenModule) },
    { path: "add-tip", loadChildren: () => import("./add-tip/add-tip.module").then(m => m.AddTipModule) },
    { path: "saved-bets", component: SavedBetsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
