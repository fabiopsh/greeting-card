import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-surface">
			<header className="border-b border-gray-200 bg-white">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 justify-between items-center">
						<div className="flex">
							<Link href="/admin" className="flex items-center">
								<span className="text-xl font-bold text-primary">Card Admin</span>
							</Link>
						</div>
						<div className="flex items-center">
							<Link href="/admin/create" className="text-sm font-medium text-gray-700 hover:text-primary">
								Create New Card
							</Link>
						</div>
					</div>
				</div>
			</header>
			<main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">{children}</main>
		</div>
	);
}
