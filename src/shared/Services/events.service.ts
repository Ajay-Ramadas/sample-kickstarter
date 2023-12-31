/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'eventemitter3';

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event: any, fn?: any) => eventEmitter.on(event, fn),
  once: (event: any, fn?: any) => eventEmitter.once(event, fn),
  off: (event: any, fn?: any) => eventEmitter.off(event, fn),
  emit: (event: any, fn?: any) => eventEmitter.emit(event, fn)
};

Object.freeze(Emitter);

export default Emitter;
