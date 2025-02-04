import { UserNote } from "@/components/card-user-note"
import { EditNoteForm } from "@/components/edit-note-form"
import { getApiUrl } from "@/lib/utils"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

async function getHeaderData(): Promise<HeadersInit> {
	const headerData = headers()
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(headerData)
		}, 1000)
	)
}

export default async function EditNote({ params }: { params: { id: string } }) {
	const headerData = await getHeaderData()

	const response = await fetch(getApiUrl(`/user-notes/${params.id}`), {
		headers: headerData,
		next: {
			tags: [params.id]
		}
	})

	const userNote: UserNote = await response.json()

	if (!userNote) redirect("/dashboard")

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<EditNoteForm note={userNote} />
		</div>
	)
}
