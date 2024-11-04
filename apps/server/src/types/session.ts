import { AccountData } from './account';

declare module 'express-session' {
  interface SessionData {
    account?: AccountData;
  }
}

export default interface SessionData {
  account?: AccountData;
}