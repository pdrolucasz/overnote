import { cookies } from "next/headers"

import { getApiUrl } from "@/lib/utils"
import { UserNote } from "@/components/card-user-note"
import { CardPublicNote } from "@/components/card-public-note"

export default async function Page() {
	const getCookie = async (name: string) => {
		return cookies().get(name)?.value ?? ""
	}

	const sessionTokenAuthJs = await getCookie('authjs.session-token')

	const response = await fetch(getApiUrl("/public-notes"), {
		headers: {
			'Cookie': `authjs.session-token=${sessionTokenAuthJs}`
		},
		next: {
			tags: ["get-notes"]
		}
	})

	const data: UserNote[] = await response.json()

	return (
		<div className="min-h-[100vh] flex-1 md:min-h-min space-y-4 p-4 pt-0">
			{data && data.map((note) => (
				<CardPublicNote key={note.id} note={note} />
			))}
		</div>
	)
}
