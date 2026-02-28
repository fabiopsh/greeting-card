"use client";

import { useState, useTransition } from "react";
import { updateContributor, deleteContributor } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, X, Check } from "lucide-react";

type Contributor = {
	id: string;
	cardId: string;
	name: string;
	dedication: string | null;
};

export default function ContributorItem({ contributor }: { contributor: Contributor }) {
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [name, setName] = useState(contributor.name);
	const [dedication, setDedication] = useState(contributor.dedication || "");

	const handleUpdate = () => {
		if (!name.trim()) return;
		startTransition(async () => {
			await updateContributor(contributor.id, contributor.cardId, name, dedication);
			setIsEditing(false);
		});
	};

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this signature?")) {
			startTransition(async () => {
				await deleteContributor(contributor.id, contributor.cardId);
			});
		}
	};

	if (isEditing) {
		return (
			<div className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm space-y-3">
				<div>
					<Input
						placeholder="Contributor Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="h-10 text-sm"
					/>
				</div>
				<div>
					<textarea
						placeholder="Dedication (optional)"
						value={dedication}
						onChange={(e) => setDedication(e.target.value)}
						rows={2}
						className="flex w-full rounded-t-lg border-b-2 border-gray-400 bg-gray-100 px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-primary transition-colors"
					/>
				</div>
				<div className="flex gap-2">
					<Button size="sm" onClick={handleUpdate} disabled={isPending}>
						{isPending ? (
							"Saving..."
						) : (
							<>
								<Check className="w-4 h-4 mr-1" /> Save
							</>
						)}
					</Button>
					<Button
						size="sm"
						variant="ghost"
						onClick={() => {
							setName(contributor.name);
							setDedication(contributor.dedication || "");
							setIsEditing(false);
						}}
						disabled={isPending}
					>
						<X className="w-4 h-4 mr-1" /> Cancel
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start justify-between group">
			<div>
				<p className="font-semibold">{contributor.name}</p>
				{contributor.dedication && <p className="text-gray-600 mt-1">{contributor.dedication}</p>}
			</div>
			<div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsEditing(true)}
					disabled={isPending}
					title="Edit signature"
				>
					<Edit className="w-4 h-4 text-gray-500" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={handleDelete}
					disabled={isPending}
					title="Delete signature"
					className="hover:text-red-600 hover:bg-red-50"
				>
					<Trash2 className="w-4 h-4 text-red-500" />
				</Button>
			</div>
		</div>
	);
}
