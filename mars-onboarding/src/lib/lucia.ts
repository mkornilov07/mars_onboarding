import { Lucia } from "lucia";
import { Google } from "arctic";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { cache } from "react";
import type { Session, User } from "lucia";
import { redirect } from "next/navigation";
import { db } from "./db";
import { cookies } from "next/headers";
import { NeonHTTPAdapter } from "@lucia-auth/adapter-postgresql";

const adapter = new NeonHTTPAdapter(db, {
	user: "Users",
	session: "session"
});
// const adapter = new BetterSqlite3Adapter(db, {
// 	user: "Users",
// 	session: "session"
// });

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			googleId: attributes.google_id,
			picture: attributes.picture
		};
	}
});

export async function dog(id : string, category : string) {
	return await db("SELECT questionIndex FROM solves WHERE userId = $1 AND category = $2", [id, category]);
}

export async function getSolvedQuestions(id : string, category : string) {
	'use server'
	return await db("SELECT questionIndex FROM solves WHERE userId = $1 AND category = $2", [id, category]);
}

export async function solveQuestion(userId : string, questionIndex: number, category : string) {
	'use server'
	db("INSERT INTO solves (userId, questionIndex, category) VALUES ($1, $2, $3)", [userId, questionIndex, category]);
}

export async function getCurrentUser() {
	'use server'
	return (await validateRequest()).user
}
export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);


declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	google_id: number;
	picture: string;
}

export const google = new Google(
	process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!,
	process.env.DEPLOYMENT_URL+"/login/callback/"
);

export async function logout(redirectAddress : string): Promise<ActionResult | void> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect(redirectAddress);
}

interface ActionResult {
	error: string | null;
}