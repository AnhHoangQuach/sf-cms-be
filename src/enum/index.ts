export enum TransactionStatus {
  PENDING = 'PENDING',
  REJECT = 'REJECT',
  ACCEPT = 'ACCEPT',
  CANCEL = 'CANCEL',
}

export enum TransactionType {
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  XNK = 'XNK',
  SALE = 'SALE',
}

export const MISSION_STATUS = {
  PREPARING: 'PREPARING',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  FINISHED: 'FINISHED',
};
