"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addContributor } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContributorForm({ cardId }: { cardId: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [name, setName] = useState("");
	const [dedication, setDedication] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;

		startTransition(async () => {
			await addContributor(cardId, name, dedication);
			setName("");
			setDedication("");
			router.refresh();
		});
	};

	return (
		<div className="w-full p-6 rounded-3xl bg-white shadow-md border border-gray-200">
			<h3 className="text-xl font-bold mb-4">Add a new signature</h3>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Input placeholder="Contributor Name" value={name} onChange={(e) => setName(e.target.value)} required />
				</div>
				<div>
					<textarea
						placeholder="Dedication (optional)"
						value={dedication}
						onChange={(e) => setDedication(e.target.value)}
						rows={3}
						className="flex w-full rounded-t-lg border-b-2 border-gray-400 bg-gray-100 px-4 py-3 text-sm focus-visible:outline-none focus-visible:border-primary transition-colors"
					/>
				</div>
				<Button type="submit" disabled={isPending} className="w-full">
					{isPending ? "Adding..." : "Add Signature"}
				</Button>
			</form>
		</div>
	);
}
