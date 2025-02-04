"use client"

import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { UserNote } from "./card-user-note"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { extractTextFromHTML } from "@/lib/utils"
import revalidateTag from "./revalidate-tag"

interface EditNoteFormProps {
	note: UserNote
}

export const EditNoteForm: FC<EditNoteFormProps> = ({ note }) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [contentValue, setContentValue] = useState(note.content ?? "")
	const [errorContent, setErrorContent] = useState<string | null>(null)

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)
		setError(null)

		const formData = new FormData(event.currentTarget)
		formData.append("content", contentValue)

		const title = formData.get("title") as string
		const content = formData.get("content") as string || ""

		try {
			if (extractTextFromHTML(content || "").trim().length < 5) {
				setErrorContent("Required min 5 characters.")
				return
			}

			const response = await fetch(`/api/user-notes/${note.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					content,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				setError(data.error || "Something went wrong")
				return
			}

			revalidateTag(note.id)
			revalidateTag("get-notes")

			// router.refresh()
			router.back()
		} catch (error) {
			console.error(error)
			setError("Something went wrong. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (errorContent && extractTextFromHTML(contentValue || "").trim().length >= 5) {
			setErrorContent(null)
		}
	}, [contentValue, errorContent])

	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col gap-6">
				{error && (
					<div className="text-sm text-red-500 text-center">{error}</div>
				)}
				<div className="grid gap-2">
					<Label htmlFor="email">Title</Label>
					<Input
						id="title"
						name="title"
						type="text"
						placeholder="Type the title here"
						required
						disabled={isLoading}
						defaultValue={note.title}
					/>
				</div>
				<div className="flex flex-col items-start gap-2">
					<RichTextEditor handleUpdate={setContentValue} defaultValue={note.content} />
					{errorContent && (
						<div className="text-sm text-red-500 text-center">{errorContent}</div>
					)}
				</div>
				<div className="flex justify-end">
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Submitting..." : "Submit"}
					</Button>
				</div>
			</div>
		</form>
	)
}
