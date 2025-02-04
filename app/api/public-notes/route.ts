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
				isPublic: true
			},
			include: {
				user: true
			}
		})

		return NextResponse.json(notes)
	} catch (error) {
		console.error("Get Note error:", error)
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		)
	}
}
