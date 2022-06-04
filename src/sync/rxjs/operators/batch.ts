import { defer, Observable, pipe, scan } from 'rxjs';

export function batch<T>(size: number) {
  if (size <= 0) {
    return pipe(scan<T, T[]>((acc, v) => (acc.push(v), acc), [] as T[]));
  }

  return (observable: Observable<T>) => {
    return defer(() => {
      let arr: T[] = [];
      return new Observable<T[]>((subscriber) => {
        const subscription = observable.subscribe({
          next: (v) => {
            arr.push(v);
            if (arr.length < size) {
              return;
            }
            const values = arr;
            arr = [];
            subscriber.next(values);
          },
          error: (e) => subscriber.error(e),
          complete: () => {
            if (arr.length) {
              subscriber.next(arr);
            }
            subscriber.complete();
          },
        });

        return () => subscription.unsubscribe();
      });
    });
  };
}
