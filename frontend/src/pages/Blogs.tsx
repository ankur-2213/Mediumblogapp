import { AppBar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs =()=>{
    const {loading,blogs}=useBlogs();
    if(loading){
        return <div>
              <AppBar />
          <div className="flex justify-center">
            <div>
            <BlogSkeleton/>
           <BlogSkeleton/>
           <BlogSkeleton/>
           <BlogSkeleton/>
           <BlogSkeleton/>
           <BlogSkeleton/>
           <BlogSkeleton/>
            </div>
          
  
        </div>
        </div>
    }
    return (
        <div>
         
          <div className="flex justify-center">
            <div className="">
              {blogs.map((blog) => (

                <BlogCard 
                    id={blog.id}
                  authorName={blog.author.name||""}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={"Date of publication"}
                />
              ))}
            </div>
          </div>
        </div>
      );
      
  
    
}

