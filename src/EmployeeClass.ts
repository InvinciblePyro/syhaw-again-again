export class Employee {
  public button?: HTMLButtonElement;

  public constructor(
    public role: string,
    public cost: number,
    public profit: number,
    public art: string,
    public amount: number = 0,
  ) {}
}
