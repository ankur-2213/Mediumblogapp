import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import{decode,sign,verify} from 'hono/jwt'
import z from"zod"
import { signupInput,signinInput,updateBlogInput,createBlogInput } from '@ankur1357/medium-common1'
export const blogRouter=new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables:{
    userId: String;
  }
}>();

blogRouter.use('/*',async (c,next)=>{
    const token=c.req.header("authorization")|| "";
    const user=await verify(token,c.env.JWT_SECRET);
    if(user){
      
        c.set("userId",user.id as string);
        await next();
    }
    else{
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }

});

blogRouter.post('/', async (c) => {
    const prisma=new PrismaClient({
        datasourceUrl:  c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 
      const body =await c.req.json();
      const {success}=createBlogInput.safeParse(body);
      if(!success){
         c.status(411);
         return c.json({
           message:"Inputs are incorrect"
         })
      }
      const authorId=c.get("userId");
     const blog= await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:Number(authorId)
        }
      })
    return c.json({
        id: blog.id
    })
  })
  blogRouter.put('/', async (c) => {
    const prisma=new PrismaClient({
        datasourceUrl:  c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 
      const body =await c.req.json();
      const {success}=updateBlogInput.safeParse(body);
      if(!success){
         c.status(411);
         return c.json({
           message:"Inputs are incorrect"
         })
      }
     const blog= await prisma.blog.update({
        where:{
            id: body.id,
        },
        data:{
            title:body.title,
            content:body.content
        }
      })
    return c.json({
        id: blog.id
    })
  })
  blogRouter.get('/bulk',async (c)=>{
    const prisma=new PrismaClient({
       datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const blogs=await prisma.blog.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json({
       blogs:blogs
    })
 })
  blogRouter.get('/:id', async (c) => {
    const prisma=new PrismaClient({
        datasourceUrl:  c.env.DATABASE_URL,
      }).$extends(withAccelerate()) 
      const id =await c.req.param("id");
      try{
        const blog= await prisma.blog.findFirst({
            where:{
                id: Number(id),
            },
            select:{
              id:true,
              content:true,
              title:true,
             author:{
             select:{
              name:true
          }
        }
            }
          })
        return c.json({
            blog: blog
        })
      } catch(e){
        return c.json({
            message: "Error while fetching data"
        });
      }
    
  })
  
 