"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ id }: { id: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const url = `${window.location.origin}/card/${id}`;
		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(url);
			} else {
				// Fallback for non-HTTPS environments (like local network IPs)
				const textArea = document.createElement("textarea");
				textArea.value = url;
				textArea.style.position = "absolute";
				textArea.style.opacity = "0";
				document.body.prepend(textArea);
				textArea.select();
				try {
					document.execCommand("copy");
				} catch (err) {
					console.error("Fallback copy failed", err);
				} finally {
					textArea.remove();
				}
			}
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy", err);
		}
	};

	return (
		<Button variant="outline" onClick={handleCopy} className="flex-1">
			{copied ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
			{copied ? "Copied" : "Copy Link"}
		</Button>
	);
}
