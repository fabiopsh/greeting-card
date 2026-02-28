import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
	const { filename } = await params;
	// Look up the file in the public/uploads directory mapping to the mounted volume
	const path = join(process.cwd(), "public/uploads", filename);

	if (!existsSync(path)) {
		return new NextResponse("Not Found", { status: 404 });
	}

	try {
		const fileBuffer = await readFile(path);

		// Determine content type based on extension
		const ext = filename.split(".").pop()?.toLowerCase();
		let contentType = "application/octet-stream";
		if (ext === "jpg" || ext === "jpeg") contentType = "image/jpeg";
		else if (ext === "png") contentType = "image/png";
		else if (ext === "gif") contentType = "image/gif";
		else if (ext === "webp") contentType = "image/webp";

		return new NextResponse(fileBuffer, {
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (error) {
		console.error("Error reading uploaded file:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
