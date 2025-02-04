"use client"

import { FC, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Calendar, Eye } from "lucide-react"

import { Button } from "./ui/button"

import { extractTextFromHTML } from "@/lib/utils"
import { UserNote } from "./card-user-note"

interface CardPublicNoteProps {
	note: UserNote
}

export const CardPublicNote: FC<CardPublicNoteProps> = ({ note }) => {
	const [isClient, setIsClient] = useState(false)

	const dateFormatted = useMemo(() => {
		return (new Date(note.updatedAt)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
	}, [note])

	const contentFormatted = useMemo(() => {
		if (isClient) {
			return extractTextFromHTML(note.content)
		}
		return "default"
	}, [isClient, note])

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<div className="flex justify-between rounded-xl bg-muted/50 gap-10 p-4">
			<div className="space-y-4">
				<h1 className="text-xl font-bold md:text-2xl">{note.title}</h1>
				<p className="text-sm">{contentFormatted}</p>
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
						<span className="text-base">Last update at {dateFormatted}</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-center gap-2">
				<Link href={`/dashboard/public-notes/${note.id}`}>
					<Button
						variant="editable"
						type="button"
					>
						<Eye className="h-4 w-4 text-muted-500" strokeWidth={3} />
					</Button>
				</Link>
			</div>
		</div>
	)
}
