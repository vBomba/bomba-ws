import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { RECONNECT_TIMEOUT } from './const';

@Injectable({
  providedIn: 'root',
})
export class WsService {
  private _socket: Option<WebSocket> = null;
  private _connected: boolean = false;

  constructor() {
    this._connect();
  }

  get socketStatus(): boolean {
    return this._connected;
  }

  private _connect(): void {
    const protocol: string = location.protocol === 'https:' ? 'wss' : 'ws';
    const address = `${protocol}://${location.hostname}${environment.WS}`;

    this._socket = new WebSocket(address);

    this._socket.onopen = this._openHandler.bind(this);
    this._socket.onmessage = this._messageHandler.bind(this);
    this._socket.onerror = this._errorHandler.bind(this);
    this._socket.onclose = this._closeHandler.bind(this);
  }

  private _openHandler(): void {
    console.warn('%cWebSocket connected!', 'color:green; font-weight: bold');
    this.send('WebSocket connected!');
    this._connected = true;
  }

  private _messageHandler(ev: any): void {
    console.log(ev.data);
  }

  private _closeHandler(): void {
    console.warn('WebSocket closed, reconnecting...');

    this._connected = false;

    setTimeout(() => {
      this._connect();
    }, RECONNECT_TIMEOUT);
  }

  private _errorHandler(ev: Event): void {
    console.error('WebSocket errored out.', ev);

    this._socket?.close();
  }

  public send(data: any): void {
    this._socket?.send(data);
  }
}
