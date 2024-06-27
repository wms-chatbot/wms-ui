import { type DefaultSession } from "next-auth";

// 独自のログインユーザーの型を定義
export type ExtendedUser = DefaultSession['user'] & {
  email: string;
  accessToken: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
