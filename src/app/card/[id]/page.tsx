import { getCardById } from "@/app/actions";
import { notFound } from "next/navigation";
import FlipCard from "./FlipCard";

export default async function PublicCardPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const card = await getCardById(id);

	if (!card) {
		notFound();
	}

	return <FlipCard card={card} />;
}
