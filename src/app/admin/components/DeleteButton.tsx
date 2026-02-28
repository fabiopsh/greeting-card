"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteCard } from "@/app/actions";

export default function DeleteButton({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this card?")) {
			startTransition(() => {
				deleteCard(id);
			});
		}
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={handleDelete}
			title="Delete"
			className="text-red-600 hover:text-red-700 hover:bg-red-50"
			disabled={isPending}
		>
			<Trash2 className="h-4 w-4" />
		</Button>
	);
}
