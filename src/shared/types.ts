import { FastifyRequest } from 'fastify';

export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  exp: number;
  iat: number;
  aud: string;
}

export type AuthenticateRequest = {
  userID: string;
} & FastifyRequest;
