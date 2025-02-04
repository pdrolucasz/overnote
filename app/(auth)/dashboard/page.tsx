import Link from "next/link"
import { cookies } from "next/headers"
import { Plus } from "lucide-react"

import { getApiUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CardUserNote, UserNote } from "@/components/card-user-note"

export default async function Page() {
	const getCookie = async (name: string) => {
		return cookies().get(name)?.value ?? ""
	}

	const sessionTokenAuthJs = await getCookie('authjs.session-token')

	const response = await fetch(getApiUrl("/user-notes"), {
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
			<div className="flex justify-end">
				<Link href="/dashboard/quick-note">
					<Button
						variant="confirm"
						type="button"
					>
						<Plus className="h-4 w-4 text-muted-500" strokeWidth={3} />
						New
					</Button>
				</Link>
			</div>
			{data.map((note) => (
				<CardUserNote key={note.id} note={note} />
			))}
		</div>
	)
}
