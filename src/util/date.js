class CustomDate {
  constructor() {
    this.date = Date.now();
  }

  addYears(x = 0) {
    this.addDays(x * 365);
    return this;
  }

  addMonths(x = 0) {
    this.addDays(x * 30);
    return this;
  }

  addWeeks(x = 0) {
    this.addDays(x * 7);
    return this;
  }

  addDays(x = 0) {
    this.addHours(x * 24);
    return this;
  }

  addHours(x = 0) {
    this.addMinutes(x * 60);
    return this;
  }

  addMinutes(x = 0) {
    this.addSeconds(x * 60);
    return this;
  }

  addSeconds(x = 0) {
    this.addMilliSeconds(x * 1000);
    return this;
  }

  addMilliSeconds(x = 0) {
    this.date += x;
    return this;
  }

  toDate() {
    return new Date(this.date);
  }
}

module.exports = CustomDate;
