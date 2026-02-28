import { getCardById } from "@/app/actions";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function PublicCardPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const card = await getCardById(id);

	if (!card) {
		notFound();
	}

	// The main container applies the dynamic theme class
	return (
		<div className={`min-h-screen ${card.themeId} transition-colors duration-500 pb-20`}>
			<div className="container mx-auto px-4 py-8 max-w-2xl flex flex-col items-center">
				{/* Main Card Container */}
				<div className="theme-card w-full rounded-[2rem] overflow-hidden mt-8 mb-8 p-6 sm:p-10 flex flex-col items-center text-center">
					<h1 className="text-4xl sm:text-5xl font-bold mb-2">Happy Birthday, {card.recipientName}!</h1>

					<p className="text-lg opacity-80 mb-8 font-medium">
						{new Date(card.birthdayDate).toLocaleDateString(undefined, {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>

					<div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-8 shadow-inner border border-black/10">
						{/* Standard img tag is fine since Next.js Image might need config for local uploads */}
						<img
							src={card.photoUrl}
							alt={`Photo for ${card.recipientName}`}
							className="object-cover w-full h-full"
						/>
					</div>

					<div className="w-full prose prose-lg mt-4 max-w-none">
						<p className="whitespace-pre-wrap text-xl sm:text-2xl leading-relaxed">
							&quot;{card.mainMessage}&quot;
						</p>
					</div>
				</div>

				{/* Contributions List */}
				{card.contributors.length > 0 && (
					<div className="w-full mt-8">
						<h2 className="text-2xl font-bold mb-6 text-center opacity-90">Messages from Friends</h2>
						<div className="space-y-4">
							{card.contributors.map((contrib: any) => (
								<div
									key={contrib.id}
									className="theme-card p-4 rounded-2xl shadow-sm text-left backdrop-blur-sm bg-white/40"
								>
									<p className="font-bold text-lg mb-1">{contrib.name}</p>
									{contrib.dedication && <p className="opacity-90">{contrib.dedication}</p>}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
