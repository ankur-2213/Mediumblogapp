
import { AppBar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { Blog } from "../hooks"
export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
    <AppBar/>
    <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-200 w-full max-h-xl pt-10">
                <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on 2nd December 2023
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                </div>
                        <div className="col-span-4">
                            {/* <div className="text-slate-600 text-lg">
                                {blog.author.name}
                            </div> */}
                            
                            <div className="flex w-full">
                                <div className="pr-2 absolute mt-3 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                                </div>
                                <div>
                                <div className="relative left-12 mt-2 top-2 text-xl font-bold"> 
                                        {blog.author.name || "Anonymous" }
                                </div>
                                <div className="pt-2 relative top-3 text-slate-500">
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                                </div>
                                  </div>
                          </div>
                    </div>
                    </div>
            </div>
}