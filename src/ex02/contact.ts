export class Contact {
  private _name: string;
  private _phoneNumber: string;

  constructor(name: string, phoneNumber: string) {
    this._name = name;
    this._phoneNumber = phoneNumber;
  }

  public get name(): string {
    return this._name;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }
}
