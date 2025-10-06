import Scheduler from './Scheduler';

export type LiveSetChangeRecord<T> =
  {type: 'add', value: T} |
  {type: 'remove', value: T} |
  {type: 'end'};

export interface LiveSetController<T> {
  closed: boolean;
  add(item: T): void;
  remove(item: T): void;
  error(err: any): void;
  end(): void;
}

export interface ListenHandler {
  unsubscribe(): void;
  pullChanges?: () => void;
}

export interface LiveSetInit<T> {
  scheduler?: Scheduler;
  read(): Set<T>;
  listen(
    setValues: { (values: Set<T>): void },
    controller: LiveSetController<T>
  ): void|ListenHandler|(()=>void);
}

export type LiveSetSubscriber<T> = (changes: ReadonlyArray<LiveSetChangeRecord<T>>) => void;

export interface LiveSetSubscription {
  closed: boolean;
  unsubscribe(): void;
  pullChanges(): void;
}

export interface LiveSetObserver<T> {
  start?: null | ((subscription: LiveSetSubscription) => void);
  next?: null | LiveSetSubscriber<T>;
  error?: null | ((err: any) => void);
  complete?: null | (() => void);
}

export default class LiveSet<T> {
  static defaultScheduler: Scheduler;

  constructor(init: LiveSetInit<T>);

  static active<T>(initialValues: null|void|Set<T>, options?: null|{scheduler?: Scheduler}): {liveSet: LiveSet<T>, controller: LiveSetController<T>};

  static constant<T>(values: Set<T>, options?: null|{scheduler?: Scheduler}): LiveSet<T>;

  values(): Set<T>;

  isEnded(): boolean;

  getScheduler(): Scheduler;

  subscribe(observer: LiveSetObserver<T>): LiveSetSubscription;
  subscribe(onNext: LiveSetSubscriber<T>, onError?: null|((err: any) => void), onComplete?: null|(() => void)): LiveSetSubscription;

  // [Symbol.observable]: any;
}
