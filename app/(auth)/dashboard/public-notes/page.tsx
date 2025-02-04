import { cookies } from "next/headers"

import { getApiUrl } from "@/lib/utils"
import { UserNote } from "@/components/card-user-note"
import { CardPublicNote } from "@/components/card-public-note"

export default async function Page() {
	const getCookie = async (name: string) => {
		return cookies().get(name)?.value ?? ""
	}

	const cookieSearch = process.env.NODE_ENV === "development" ? "authjs.session-token" : "__Secure-authjs.session-token"

	const sessionTokenAuthJs = await getCookie(cookieSearch)

	const response = await fetch(getApiUrl("/public-notes"), {
		headers: {
			'Cookie': `${cookieSearch}=${sessionTokenAuthJs}`
		},
		next: {
			tags: ["get-notes"]
		}
	})

	const data: UserNote[] = await response.json()

	return (
		<div className="min-h-[100vh] flex-1 md:min-h-min space-y-4 p-4 pt-0">
			{data?.length && data.map((note) => (
				<CardPublicNote key={note.id} note={note} />
			))}
		</div>
	)
}
