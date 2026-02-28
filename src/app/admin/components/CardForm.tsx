"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCard, updateCard } from "@/app/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const THEMES = [
	"theme-minimal-elegance",
	"theme-neon-cyberpunk",
	"theme-vintage-kraft",
	"theme-pop-art",
	"theme-soft-floral",
	"theme-deep-space",
	"theme-retro-80s",
	"theme-watercolor",
	"theme-luxury-gold",
	"theme-confetti-party",
];

type CardData = {
	id?: string;
	recipientName: string;
	photoUrl: string;
	birthdayDate: Date;
	mainMessage: string;
	themeId: string;
};

export default function CardForm({ initialData }: { initialData?: CardData }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		recipientName: initialData?.recipientName || "",
		birthdayDate: initialData ? new Date(initialData.birthdayDate).toISOString().split("T")[0] : "",
		mainMessage: initialData?.mainMessage || "",
		themeId: initialData?.themeId || THEMES[0],
		photoUrl: initialData?.photoUrl || "",
	});

	const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;

		setLoading(true);
		const file = e.target.files[0];
		const data = new FormData();
		data.append("file", file);

		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: data,
			});
			const json = await res.json();
			if (json.success) {
				setFormData((prev) => ({ ...prev, photoUrl: json.photoUrl }));
			} else {
				alert("Upload failed");
			}
		} catch (err) {
			alert("Upload error");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.photoUrl) {
			alert("Please upload a photo!");
			return;
		}

		setLoading(true);
		try {
			const dbData = {
				...formData,
				birthdayDate: new Date(formData.birthdayDate),
			};

			if (initialData?.id) {
				await updateCard(initialData.id, dbData);
			} else {
				await createCard(dbData);
			}
			router.push("/admin");
		} catch (err) {
			console.error(err);
			alert("Error saving card");
			setLoading(false);
		}
	};

	return (
		<Card className="max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>{initialData ? "Edit Card" : "Create New Card"}</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
						<Input
							required
							value={formData.recipientName}
							onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
							placeholder="e.g. Maria"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Birthday Date</label>
						<Input
							type="date"
							required
							value={formData.birthdayDate}
							onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Main Message</label>
						<textarea
							required
							className="flex w-full rounded-t-lg border-b-2 border-gray-400 bg-gray-100 px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-primary focus-visible:bg-gray-200 transition-colors"
							rows={4}
							value={formData.mainMessage}
							onChange={(e) => setFormData({ ...formData, mainMessage: e.target.value })}
							placeholder="Happy Birthday!"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
						<select
							className="flex h-14 w-full rounded-t-lg border-b-2 border-gray-400 bg-gray-100 px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-primary focus-visible:bg-gray-200 transition-colors"
							value={formData.themeId}
							onChange={(e) => setFormData({ ...formData, themeId: e.target.value })}
						>
							{THEMES.map((theme) => (
								<option key={theme} value={theme}>
									{theme.replace("theme-", "").replace("-", " ").toUpperCase()}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
						{formData.photoUrl && (
							<div className="mb-2">
								<img src={formData.photoUrl} alt="Preview" className="h-32 rounded-lg object-cover" />
							</div>
						)}
						<Input
							type="file"
							accept="image/*"
							onChange={uploadFile}
							disabled={loading}
							required={!formData.photoUrl}
						/>
					</div>

					<Button type="submit" disabled={loading} className="w-full mt-4">
						{loading ? "Saving..." : "Save Card"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
