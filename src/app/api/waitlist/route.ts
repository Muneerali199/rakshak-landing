import { neon } from "@neondatabase/serverless"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email required" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    await sql`INSERT INTO waitlist (email) VALUES (${email})`

    return Response.json({ success: true })
  } catch (e: unknown) {
    if ((e as Record<string, unknown>)?.code === "23505") {
      return Response.json({ success: true, existing: true })
    }
    console.error("Waitlist error:", e)
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
