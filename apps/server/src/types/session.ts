import { AccountData } from './account';

declare module 'express-session' {
  interface SessionData {
    account?: AccountData;
  }
}