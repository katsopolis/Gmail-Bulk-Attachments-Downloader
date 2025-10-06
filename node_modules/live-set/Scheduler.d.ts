export default class Scheduler {
  schedule(cb: ()=>void): void;
  flush(): void;
}
