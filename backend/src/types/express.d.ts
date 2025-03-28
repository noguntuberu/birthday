import { IProfile } from '../models/Profile';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
      profile?: IProfile;
    }
  }
}