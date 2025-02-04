import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const session = await auth()

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Not authenticated." },
				{ status: 401 }
			)
		}

		const notes = await prisma.note.findMany({
			where: {
				userId: session.user.id
			},
			orderBy: [
				{ updatedAt: "desc" }
			],
		})

		return NextResponse.json(notes)
	} catch (error) {
		console.error("Get Notes error:", error)
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	try {
		const { title, content } = await req.json()

		if (!title || !content) {
			return NextResponse.json(
				{ error: "Title and Content are required." },
				{ status: 400 }
			)
		}

		const session = await auth()

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Not authenticated." },
				{ status: 401 }
			)
		}

		const note = await prisma.note.create({
			data: {
				title,
				content,
				userId: session.user.id
			},
		})

		return NextResponse.json(note)
	} catch (error) {
		console.error("Save Note error:", error)
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		)
	}
}
