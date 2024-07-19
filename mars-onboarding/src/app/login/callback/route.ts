import { google, lucia, db } from "@/lucia";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { SqliteError } from "better-sqlite3";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
    const storedCodeVerifier = cookies().get("code_verifier")?.value??null;
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
		return new Response(null, {
			status: 400, 
			statusText: "first",
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

		const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
				scope: "openid email profile"
			}
		});
		const googleUser: GoogleUser = await googleUserResponse.json();
		// return new Response(null, {
		// 	status: 200,
		// 	statusText: "Validated user",
		// 	headers: {
		// 		googleuser: JSON.stringify(googleUser)
		// 	}
		// });
		console.log(googleUser)
		const existingUser : any = db.prepare("SELECT id FROM Users WHERE id = ?").get(googleUser.sub);
		
		if (existingUser) { // new Response.redirect([level url])
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/level/"
				}
			});
		}

		// below only runs when new user
		// const userId : string = generateIdFromEntropySize(10); // 16 characters long
		try {
			db.prepare("CREATE TABLE IF NOT EXISTS Users(id TEXT NOT NULL PRIMARY KEY)").run();
			db.prepare(`CREATE TABLE IF NOT EXISTS session (
				id TEXT NOT NULL PRIMARY KEY,
				expires_at INTEGER NOT NULL,
				user_id TEXT NOT NULL,
				FOREIGN KEY (user_id) REFERENCES Users(id)
			)`).run();
			db.prepare("INSERT INTO Users ( id ) VALUES (?)").run(googleUser.sub);
		}
		catch(e : any) {
			if(e instanceof SqliteError) {}
			else return new Response(null, {
				status: 598, 
				statusText: e,
				headers: {"GoogleUser": JSON.stringify(googleUser),
							"google_id" : googleUser.sub 
				}
			});
		}
		const session = await lucia.createSession(googleUser.sub, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/level/"
			}
		});
	} catch (e : any) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
				headers: {msg: 'invalid code'},
			});
		}

		return new Response(null, {
			status: 500,
			statusText: e
		});
	}
}

interface GoogleUser {
	sub: string;
	picture: string;
}