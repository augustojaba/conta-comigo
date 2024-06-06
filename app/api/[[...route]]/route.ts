import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { handle } from "hono/vercel"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app
  .get(
  '/hello',
  clerkMiddleware(),
   (c) => {
    const auth = getAuth(c)
    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' })
    }
    return c.json({ message: 'Hello Next.js!', user: auth.userId})
  })
  .get(
    '/hello/:name',
    zValidator("param", z.object({ test: z.number() })),
    (c) => {
      const { test } = c.req.valid("param")
      return c.json({ message: `Hello ${c.req.param('name')}!` })
  })

export const GET = handle(app)
export const POST = handle(app)