"use client"

import { FC, useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, Pen, Share2, Trash2 } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"

import { Button } from "./ui/button"
import * as Switch from "./ui/switch"
import { useSidebar } from "./ui/sidebar"
import * as AlertDialog from "./ui/alert-dialog"

import { useToast } from "@/hooks/use-toast"
import { extractTextFromHTML } from "@/lib/utils"

export type UserNote = {
	id: string
	title: string
	content: string
	isPublic: boolean
	updatedAt: string
	user?: {
		name: string
	}
}

interface CardUserNoteProps {
	note: UserNote
}

export const CardUserNote: FC<CardUserNoteProps> = ({ note }) => {
	const router = useRouter()

	const { isMobile } = useSidebar()
	const { toast } = useToast()

	const [isClient, setIsClient] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const dateFormatted = useMemo(() => {
		return (new Date(note.updatedAt)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
	}, [note])

	const contentFormatted = useMemo(() => {
		if (isClient) {
			return extractTextFromHTML(note.content)
		}
		return "default"
	}, [isClient, note])

	const handleDeleteNote = useCallback(async () => {
		try {
			const response = await fetch(`/api/user-notes/${note.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				}
			})

			const data = await response.json()

			if (!response.ok) {
				toast({
					variant: "destructive",
					title: "Error on delete.",
					description: data.error || "Something went wrong",
					duration: 3000
				})
				return
			}

			router.refresh()

			toast({
				title: "Successful deleted.",
				description: data.message,
				duration: 3000
			})
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				title: "Error on delete.",
				description: "Something went wrong. Please try again.",
				duration: 3000
			})
		} finally {
			setIsLoading(false)
		}
	}, [note, toast, router])

	const handleToggleVisibility = useCallback(async () => {
		try {
			const response = await fetch(`/api/user-notes/${note.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					isPublic: !note.isPublic
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				toast({
					variant: "destructive",
					title: "Error on change.",
					description: data.error || "Something went wrong",
					duration: 3000
				})
				return
			}

			router.refresh()

			toast({
				title: "Successful changed.",
				description: data.message,
				duration: 3000
			})
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				title: "Error on delete.",
				description: "Something went wrong. Please try again.",
				duration: 3000
			})
		} finally {
			setIsLoading(false)
		}
	}, [note, toast, router])

	const handleShareNote = useCallback(async () => {
		if (!note.isPublic) await handleToggleVisibility()

		if (isClient) {
			navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/dashboard/public-notes/${note.id}`)
		}

		toast({
			title: "Copied to clipboard.",
			duration: 3000
		})
	}, [note, isClient, handleToggleVisibility, toast])

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
						{note.isPublic ? <div className="w-2 h-2 rounded-full bg-green-500" /> : <div className="w-2 h-2 rounded-full bg-red-500" />} <span className="text-base">{note.isPublic ? "Public" : "Private"}</span>
					</div>
					<div className="flex items-center gap-1">
						<Calendar className="h-4 w-4 text-muted-500 -mt-1" />
						<span className="text-base">Last update at {dateFormatted}</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-center gap-2">
				<div className="flex gap-1">
					<Link href={`/dashboard/edit-note/${note.id}`}>
						<Button
							variant="editable"
							type="button"
						>
							<Pen className="h-4 w-4 text-muted-500" strokeWidth={3} />
						</Button>
					</Link>
					<Button
						variant="destructive"
						type="button"
						disabled={isLoading}
						onClick={handleDeleteNote}
					>
						<Trash2 className="h-4 w-4 text-muted-500" strokeWidth={3} />
					</Button>
				</div>

				<div className="flex justify-center">
					{
						note.isPublic
							? (
								<Button
									variant="default"
									type="button"
									onClick={handleShareNote}
								>
									<Share2 className="h-4 w-4 text-muted-500" strokeWidth={3} />
								</Button>
							)
							: (
								<AlertDialog.AlertDialog>
									<AlertDialog.AlertDialogTrigger asChild>
										<Button
											variant="default"
											type="button"
											disabled={isLoading}
										>
											<Share2 className="h-4 w-4 text-muted-500" strokeWidth={3} />
										</Button>
									</AlertDialog.AlertDialogTrigger>
									<AlertDialog.AlertDialogContent>
										<AlertDialog.AlertDialogHeader>
											<AlertDialog.AlertDialogTitle>Are you absolutely sure?</AlertDialog.AlertDialogTitle>
											<AlertDialog.AlertDialogDescription>
												This action will mark the note as public and shared in the feed.
											</AlertDialog.AlertDialogDescription>
										</AlertDialog.AlertDialogHeader>
										<AlertDialog.AlertDialogFooter>
											<AlertDialog.AlertDialogCancel>Cancel</AlertDialog.AlertDialogCancel>
											<AlertDialog.AlertDialogAction onClick={handleShareNote}>Continue</AlertDialog.AlertDialogAction>
										</AlertDialog.AlertDialogFooter>
									</AlertDialog.AlertDialogContent>
								</AlertDialog.AlertDialog>
							)
					}
				</div>

				<Tooltip>
					<TooltipTrigger>
						<Switch.Root>
							<Switch.Control checked={note.isPublic} onChange={handleToggleVisibility} disabled={isLoading} />
							<Switch.Element />
						</Switch.Root>
					</TooltipTrigger>
					<TooltipContent
						side="right"
						align="center"
						hidden={isMobile}
						className="whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
					>
						{note.isPublic ? "Make Private" : "Make Public"}
					</TooltipContent>
				</Tooltip>
			</div>
		</div>
	)
}
