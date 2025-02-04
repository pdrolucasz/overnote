"use client"

import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { extractTextFromHTML } from "@/lib/utils"
import revalidateTag from "./revalidate-tag"

export const CreateNoteForm = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [contentValue, setContentValue] = useState("")
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

			const response = await fetch("/api/user-notes", {
				method: "POST",
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

			revalidateTag("get-notes")

			router.refresh()
			router.push("/dashboard")
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
					/>
				</div>
				<div className="flex flex-col items-start gap-2">
					<RichTextEditor handleUpdate={setContentValue} />
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
