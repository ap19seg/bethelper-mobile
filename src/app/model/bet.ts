import { Tip } from "./tip";
import { CombinationBet } from "./combinationBet";

export class Bet {
  constructor(
    public name: string,
    public date: Date = new Date(),
    public tips: Array<Tip>
  ) {}


}
