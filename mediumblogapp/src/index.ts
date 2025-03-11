import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import{decode,sign,verify} from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);




export default app
//DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiODIzMjUwMTgtYjkzMy00NjNkLTlmODAtMGEyMDBiY2Q2OGZlIiwidGVuYW50X2lkIjoiZGY2MWUwOWU4NjliYWU1N2NkZmExNDgwNGVlMzk3ZTA3YmNmYzBlNjNmMzRiOWU5YTM3ZTg5Njg1MDVlZWNmNSIsImludGVybmFsX3NlY3JldCI6ImRjZjg4NTVlLWVkMTQtNGJjZS1hNDEzLTllZWFmNTM0YjkxNiJ9.5ri0931wK0r6JADlbKYqg0UmD0OOnDGY2Ay16L9XMj4"
//postgres://avnadmin:AVNS_I528OLDtda4_naWnLVS@pg-1b8460d3-ankurarora1002-d604.d.aivencloud.com:10066/defaultdb?sslmode=require
// //{
//   "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nn0.UGQoBLpcwHnqUy2ZmDW7IqcNnIC7d_8rELWpnWgYPj4"
// }