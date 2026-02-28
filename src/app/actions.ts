"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCard(data: {
	recipientName: string;
	photoUrl: string;
	birthdayDate: Date;
	mainMessage: string;
	themeId: string;
}) {
	const card = await prisma.card.create({
		data: {
			recipientName: data.recipientName,
			photoUrl: data.photoUrl,
			birthdayDate: data.birthdayDate,
			mainMessage: data.mainMessage,
			themeId: data.themeId,
		},
	});

	revalidatePath("/admin");
	return card;
}

export async function updateCard(
	id: string,
	data: {
		recipientName: string;
		photoUrl: string;
		birthdayDate: Date;
		mainMessage: string;
		themeId: string;
	},
) {
	const card = await prisma.card.update({
		where: { id },
		data,
	});

	revalidatePath("/admin");
	revalidatePath(`/card/${id}`);
	return card;
}

export async function deleteCard(id: string) {
	await prisma.card.delete({
		where: { id },
	});

	revalidatePath("/admin");
}

export async function getCards() {
	return await prisma.card.findMany({
		orderBy: { createdAt: "desc" },
	});
}

export async function getCardById(id: string) {
	return await prisma.card.findUnique({
		where: { id },
		include: { contributors: true },
	});
}

export async function addContributor(cardId: string, name: string, dedication?: string) {
	await prisma.contributor.create({
		data: {
			cardId,
			name,
			dedication: dedication || null,
		},
	});

	revalidatePath(`/admin/edit/${cardId}`);
	revalidatePath(`/card/${cardId}`); // Also revalidate public card
}

export async function updateContributor(id: string, cardId: string, name: string, dedication?: string) {
	await prisma.contributor.update({
		where: { id },
		data: {
			name,
			dedication: dedication || null,
		},
	});

	revalidatePath(`/admin/edit/${cardId}`);
	revalidatePath(`/card/${cardId}`);
}

export async function deleteContributor(id: string, cardId: string) {
	await prisma.contributor.delete({
		where: { id },
	});

	revalidatePath(`/admin/edit/${cardId}`);
	revalidatePath(`/card/${cardId}`);
}
