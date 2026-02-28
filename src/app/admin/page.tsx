import { getCards, deleteCard } from "@/app/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Copy, Edit, Trash2 } from "lucide-react";
import CopyButton from "./components/CopyButton";
import DeleteButton from "./components/DeleteButton";

export default async function AdminDashboard() {
	const cards = await getCards();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
				<Link href="/admin/create">
					<Button>Create New Card</Button>
				</Link>
			</div>

			{cards.length === 0 ? (
				<div className="text-center bg-white rounded-3xl p-8 border border-gray-200">
					<p className="text-gray-500 mb-4">No cards have been created yet.</p>
					<Link href="/admin/create">
						<Button variant="outline">Create your first card</Button>
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{cards.map((card: any) => (
						<Card key={card.id}>
							<CardHeader>
								<CardTitle>{card.recipientName}</CardTitle>
								<CardDescription>Birthday: {new Date(card.birthdayDate).toLocaleDateString()}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm truncate mb-2">Theme: {card.themeId}</p>
								<div
									className="w-full h-32 rounded-xl bg-cover bg-center"
									style={{ backgroundImage: `url(${card.photoUrl})` }}
								/>
							</CardContent>
							<CardFooter className="flex justify-between space-x-2">
								<CopyButton id={card.id} />
								<div className="flex space-x-2">
									<Link href={`/admin/edit/${card.id}`}>
										<Button variant="outline" size="icon" title="Edit">
											<Edit className="h-4 w-4" />
										</Button>
									</Link>
									<DeleteButton id={card.id} />
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
