export class Payment {
  constructor(
    public session_id: string,
    public date: Date,
    public value: Number,
    public type: string
  ) {}
}
