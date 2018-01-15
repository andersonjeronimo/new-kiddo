export class Session {
  constructor(
    public customer_id: string,
    public start: Date,
    public end: Date,
    public paid: boolean,
    public finished: boolean
  ) {}
}
