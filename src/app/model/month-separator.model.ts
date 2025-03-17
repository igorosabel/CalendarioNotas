import { monthList } from '@modules/shared/utils';
import { getRandomNumber } from '@osumi/tools';

export default class MonthSeparator {
  id: number = getRandomNumber(-1, -1000);
  text: string | null = null;

  constructor(
    public month: number | null = null,
    public year: number | null = null
  ) {
    if (this.month !== null && this.year !== null) {
      this.text = monthList[this.month].name + ' ' + this.year;
    }
  }
}
