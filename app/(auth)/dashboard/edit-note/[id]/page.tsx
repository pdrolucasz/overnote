import { UserNote } from "@/components/card-user-note"
import { EditNoteForm } from "@/components/edit-note-form"
import { getApiUrl } from "@/lib/utils"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function EditNote({ params }: { params: { id: string } }) {
	const getCookie = async (name: string) => {
		return cookies().get(name)?.value ?? ""
	}

	const sessionTokenAuthJs = await getCookie('authjs.session-token')

	const response = await fetch(getApiUrl(`/user-notes/${params.id}`), {
		headers: {
			'Cookie': `authjs.session-token=${sessionTokenAuthJs}`
		},
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
