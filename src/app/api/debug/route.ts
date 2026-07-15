export async function GET() {
  return Response.json({
    has_db_url: !!process.env.DATABASE_URL,
    db_url_length: process.env.DATABASE_URL?.length ?? 0,
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV,
  })
}
