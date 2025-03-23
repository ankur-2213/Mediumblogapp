import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import{decode,sign,verify} from 'hono/jwt'
import { signupInput,signinInput,updateBlogInput,createBlogInput } from '@ankur1357/medium-common1'

export const userRouter=new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>();
userRouter.post('/signup', async (c) => {
    const prisma=new PrismaClient({
      datasourceUrl:  c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    const body =await c.req.json();
   const {success}=signupInput.safeParse(body);
   if(!success){
      c.status(411);
      return c.json({
        message:"Inputs are incorrect"
      })
   }
    
    try{
      const user=await prisma.user.create({
        data:{
          username:body.username,
          password:body.password,
          name:body.name
        },
      })
      const token=await sign({id:user.id},c.env.JWT_SECRET )
    return c.text(
      token
      ) 
    }
     catch(e){
        return c.text('User Already exists')
     }
  })
  userRouter.post('/signin',async (c) => {
    const prisma=new PrismaClient({
      datasourceUrl:  c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    const body =await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
       c.status(411);
       return c.json({
         message:"Inputs are incorrect"
       })
    }
   
    
    try{
      const user=await prisma.user.findFirst({
        where:{
          username:body.username,
          password:body.password,
        }
      })
      if(!user){
        c.status(403);//unauthorized
        return c.text("user doesnt exist")
      }
      const token=await sign({id:user.id},c.env.JWT_SECRET )
      return c.text(
        token
        ) 
    }
     catch(e){
        return c.text('User Already exists')
     }
  })