import { defer, Observable } from 'rxjs';

export function batch<T>(size: number) {
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
