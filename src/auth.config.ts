import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ExtendedUser } from "./next-auth";

export default {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "メールアドレスを入力してください" },
          password: { label: "Password", type: "password", placeholder: "パスワードを入力してください" }
        },
        authorize: async (credentials) => {
          const res = await fetch("http://localhost:5100/v1/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              Email: credentials?.email,
              Password: credentials?.password
            })
          });
          if (res.status !== 200) return null;
          const token = await res.json();

          if (token) {
            return { email: credentials?.email, accessToken: token.token } as ExtendedUser;
          } else {
            return null;
          }
        }
      })
    ],
    session: {
      strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout"
    },
    callbacks: {
        authorized({ request, auth }) {
            const { nextUrl } = request;
            const isLoggedIn = !!auth;

            const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
            const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
            const isAuthRoute = authRoutes.includes(nextUrl.pathname);

            if (isApiAuthRoute) {
                return true;
            }

            if (isAuthRoute) {
                if (isLoggedIn) {
                    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
                }
                return true;
            }

            return !(!isLoggedIn && !isPublicRoute);
        },
      jwt: async ({ token, user }) => {
        if (user) {
            const extendedUser = user as ExtendedUser;
            token.accessToken = extendedUser.accessToken;
            token.email = extendedUser.email;  // email を token に追加
        }
        return token;
      },
      session: async ({ session, token }) => {
        session.accessToken = token.accessToken;
        session.user.email = token.email;  // email を session に反映
        return session;
      }
    }
  } satisfies NextAuthConfig
