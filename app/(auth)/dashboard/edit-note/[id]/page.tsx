import { UserNote } from "@/components/card-user-note"
import { EditNoteForm } from "@/components/edit-note-form"
import { getApiUrl } from "@/lib/utils"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function EditNote({ params }: { params: { id: string } }) {
	const getCookie = async (name: string) => {
		return cookies().get(name)?.value ?? ""
	}

	const cookieSearch = process.env.NODE_ENV === "development" ? "authjs.session-token" : "__Secure-authjs.session-token"

	const sessionTokenAuthJs = await getCookie(cookieSearch)

	const response = await fetch(getApiUrl(`/user-notes/${params.id}`), {
		headers: {
			'Cookie': `${cookieSearch}=${sessionTokenAuthJs}`
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
