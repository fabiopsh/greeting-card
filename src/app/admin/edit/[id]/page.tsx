import { getCardById } from "@/app/actions";
import CardForm from "../../components/CardForm";
import ContributorForm from "../../components/ContributorForm";
import ContributorItem from "../../components/ContributorItem";
import { notFound } from "next/navigation";

export default async function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
	// Await the destructured params as required in Next 15+ async components
	const { id } = await params;
	const card = await getCardById(id);

	if (!card) {
		notFound();
	}

	return (
		<div className="py-6 space-y-8">
			<CardForm initialData={card} />

			<div className="max-w-2xl mx-auto">
				<div className="mb-4">
					<h2 className="text-2xl font-bold">Signatures & Dedications</h2>
					<p className="text-gray-500">Add people who are participating in this greeting card.</p>
				</div>

				{card.contributors.length > 0 && (
					<div className="mb-6 space-y-2">
						{card.contributors.map((contrib: any) => (
							<ContributorItem key={contrib.id} contributor={contrib} />
						))}
					</div>
				)}

				<ContributorForm cardId={card.id} />
			</div>
		</div>
	);
}
