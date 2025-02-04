import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { id: string } }) {
	try {
		const noteId = params.id

		const session = await auth()

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Not authenticated." },
				{ status: 401 }
			)
		}

		const note = await prisma.note.findFirst({
			where: {
				id: noteId
			},
		})

		if (!note) {
			return NextResponse.json(
				{ error: "Note not found." },
				{ status: 404 }
			)
		}

		if (note.userId !== session.user.id) {
			return NextResponse.json(
				{ error: "Not authorized." },
				{ status: 401 }
			)
		}

		return NextResponse.json(note)
	} catch (error) {
		console.error("Get Note error:", error)
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		)
	}
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
	try {
		const noteId = params.id

		const session = await auth()

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Not authenticated." },
				{ status: 401 }
			)
		}

		const { title, content, isPublic } = await req.json()

		if ((title && title.length === 0) || (content && content.length === 0)) {
			return NextResponse.json(
				{ error: "Title and Content are required." },
				{ status: 400 }
			)
		}

		const note = await prisma.note.findFirst({
			where: {
				id: noteId
			},
		})

		if (!note) {
			return NextResponse.json(
				{ error: "Note not found." },
				{ status: 404 }
			)
		}

		if (note.userId !== session.user.id) {
			return NextResponse.json(
				{ error: "Not authorized." },
				{ status: 401 }
			)
		}

		await prisma.note.update({
			where: {
				id: noteId,
				userId: session.user.id
			},
			data: {
				title: title !== null ? title : note.title,
				content: content !== null ? content : note.content,
				isPublic: isPublic !== null ? isPublic : note.isPublic,
			}
		})

		return NextResponse.json(note)
	} catch (error) {
		console.error("Update Note error:", error)
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		)
	}
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
	try {
		const noteId = params.id

		const session = await auth()

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Not authenticated." },
				{ status: 401 }
			)
		}

		const note = await prisma.note.findFirst({
			where: {
				id: noteId
			},
		})

		if (!note) {
			return NextResponse.json(
				{ error: "Note not found." },
				{ status: 404 }
			)
		}

		if (note.userId !== session.user.id) {
			return NextResponse.json(
				{ error: "Not authorized." },
				{ status: 401 }
			)
		}

		await prisma.note.delete({
			where: {
				id: noteId,
				userId: session.user.id
			},
		})

		return NextResponse.json(
			{ message: "Successfully deleted." },
			{ status: 200 }
		)
	} catch (error) {
		console.error("Delete Note error:", error)
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		)
	}
}
