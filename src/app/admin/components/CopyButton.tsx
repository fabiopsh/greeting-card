"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ id }: { id: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const url = `${window.location.origin}/card/${id}`;
		await navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Button variant="outline" onClick={handleCopy} className="flex-1">
			{copied ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
			{copied ? "Copied" : "Copy Link"}
		</Button>
	);
}
