export class PaginatedResult<T, K = number> {
  constructor(
    public results: T[],
    public count: number,
    public lastEvaluatedKey?: K,
  ) {}
}
