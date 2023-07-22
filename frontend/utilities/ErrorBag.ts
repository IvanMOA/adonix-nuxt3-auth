export class ErrorBag {
  constructor(private errors: Record<string, string[]>) {}
  has(field: string) {
    return this.errors.hasOwnProperty(field);
  }
  get(field: string) {
    return this.errors[field];
  }
  isEmpty() {
    return Object.keys(this.errors).length === 0;
  }
}
