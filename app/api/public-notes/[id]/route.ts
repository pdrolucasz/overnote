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
				id: noteId,
				isPublic: true
			},
			include: {
				user: true
			}
		})

		return NextResponse.json(note)
	} catch (error) {
		console.error("Get Note error:", error)
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		)
	}
}
