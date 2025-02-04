import type { PropsWithChildren } from "react"

import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export default async function PublicLayout({
	children
}: Readonly<PropsWithChildren>) {

	const session = await auth()

	if (session?.user?.id) {
		redirect("/dashboard")
	}

	return (
		<span>
			{children}
		</span>
	)
}
