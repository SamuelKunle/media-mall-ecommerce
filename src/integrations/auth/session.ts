/**
 * Optional auth bridge — wire Supabase Auth, NextAuth, Clerk, etc.
 * UI routes can call `getOptionalSession()` from Server Components / Route Handlers.
 */

export type SessionUser = {
  id: string;
  email: string;
  name?: string;
};

export type Session = { user: SessionUser };

/** Returns null until you connect a real auth provider */
export async function getOptionalSession(): Promise<Session | null> {
  return null;
}
