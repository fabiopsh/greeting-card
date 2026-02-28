import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
	try {
		const data = await request.formData();
		const file: File | null = data.get("file") as unknown as File;

		if (!file) {
			return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Create a unique filename
		const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

		// public/uploads directory should already exist based on our docker-compose / startup script
		const path = join(process.cwd(), "public/uploads", uniqueFilename);
		await writeFile(path, buffer);

		console.log(`Uploaded file to ${path}`);

		return NextResponse.json({
			success: true,
			photoUrl: `/uploads/${uniqueFilename}`,
		});
	} catch (error) {
		console.error("Error uploading file:", error);
		return NextResponse.json({ success: false, message: "Error uploading file" }, { status: 500 });
	}
}
