export enum WsRequestType {
  Subscribe = 'subscribe',
  Set = 'set',
  Close = 'close',
  Delete = 'delete',
  Address = 'address',
}

export enum WsResponseType {
  Err = 'err',
  Updates = 'updates',
  Address = 'address',
}
