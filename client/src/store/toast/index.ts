import { errorHandler } from '@app/lib/axios';
import { format } from 'date-fns';
import { observable, makeObservable, action } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { RootStore } from '..';

interface NewMessage {
  title?: string;
  message: string | string[];
  type?: 'standard' | 'error' | 'success' | 'warning';
  autoHide?: boolean;
}

interface Message extends NewMessage {
  uuid: string;
  time: string;
  message: string; // Ensures message is always a string
}

export default class ToastStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      messages: observable,
      enqueue: action,
      remove: action
    });
    this.rootStore = rootStore;
  }
  autoHideDuration = 4000;
  messages: Message[] = [];

  enqueue({
    autoHide = true,
    message,
    type = 'standard',
    title
  }: NewMessage): void {
    const formattedMessage = Array.isArray(message)
      ? message.join('\n')
      : message;

    const msg: Message = {
      message: formattedMessage,
      title,
      type,
      autoHide,
      uuid: uuidv4(),
      time: format(new Date(), 'dd/M/yyyy @ hh:mmbbb')
    };

    requestAnimationFrame(() => {
      this.messages.push(msg);
    });

    if (msg.autoHide) {
      setTimeout(() => this.remove(msg.uuid), this.autoHideDuration);
    }
  }

  exists(item: NewMessage): boolean {
    return this.messages.some(
      (msg) =>
        msg.message ===
        (Array.isArray(item.message) ? item.message.join('\n') : item.message)
    );
  }

  remove(uuid: string): void {
    this.messages = this.messages.filter((msg) => msg.uuid !== uuid);
  }

  describeError(title: string): (err: unknown) => void {
    return (err) => this.handleError(title, err);
  }

  handleError(title: string, error: unknown): void {
    errorHandler(error, (err) => {
      this.enqueue({
        title,
        message: err.message,
        autoHide: false,
        type: 'error'
      });
    });
  }
}
