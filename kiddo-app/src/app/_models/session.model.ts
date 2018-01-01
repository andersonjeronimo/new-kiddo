export class Session {
    constructor(
        public customerID: string,
        public start: Date,
        public finish: Date,
        public active: boolean
    ) { }
  }
  