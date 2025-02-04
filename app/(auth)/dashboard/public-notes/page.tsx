import { headers } from "next/headers"

import { getApiUrl } from "@/lib/utils"
import { UserNote } from "@/components/card-user-note"
import { CardPublicNote } from "@/components/card-public-note"

async function getHeaderData(): Promise<HeadersInit> {
	const headerData = headers()
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(headerData)
		}, 1000)
	)
}

export default async function Page() {
	const headerData = await getHeaderData()

	const response = await fetch(getApiUrl("/public-notes"), {
		headers: headerData,
		next: {
			tags: ["get-notes"]
		}
	})

	const data: UserNote[] = await response.json()

	return (
		<div className="min-h-[100vh] flex-1 md:min-h-min space-y-4 p-4 pt-0">
			{data.map((note) => (
				<CardPublicNote key={note.id} note={note} />
			))}
		</div>
	)
}
