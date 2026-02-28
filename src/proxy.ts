import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/admin/:path*"],
};

export function proxy(req: NextRequest) {
	const basicAuth = req.headers.get("authorization");

	if (basicAuth) {
		const authValue = basicAuth.split(" ")[1];
		const [user, pwd] = atob(authValue).split(":");

		// Default username: admin | Password: password (if env var not set)
		const validUser = process.env.ADMIN_USER || "admin";
		const validPass = process.env.ADMIN_PASSWORD || "password";

		if (user === validUser && pwd === validPass) {
			return NextResponse.next();
		}
	}

	return new NextResponse("Auth Required", {
		status: 401,
		headers: {
			"WWW-Authenticate": 'Basic realm="Secure Admin Area"',
		},
	});
}
