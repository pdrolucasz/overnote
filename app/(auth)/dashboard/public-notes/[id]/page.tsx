import { headers } from "next/headers"
import { Calendar } from "lucide-react"
import { redirect } from "next/navigation"

import { getApiUrl } from "@/lib/utils"
import { UserNote } from "@/components/card-user-note"

export default async function ViewNote({ params }: { params: { id: string } }) {
	const response = await fetch(getApiUrl(`/public-notes/${params.id}`), {
		headers: headers(),
		next: {
			tags: [params.id]
		}
	})

	const note: UserNote = await response.json()

	if (!note) redirect("/public-notes")

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex justify-between rounded-xl bg-muted/50 gap-10 p-4">
				<div className="space-y-4">
					<h1 className="text-xl font-bold md:text-2xl">{note.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: note.content }} />
					<div className="flex gap-2">
						<div className="flex items-center gap-1">
							{note.user && (
								<>
									<div className="w-2 h-2 rounded-full bg-green-500" /> <span className="text-base">{note.user.name}</span>
								</>
							)}
						</div>
						<div className="flex items-center gap-1">
							<Calendar className="h-4 w-4 text-muted-500 -mt-1" />
							<span className="text-base">Last update at {(new Date(note.updatedAt)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
