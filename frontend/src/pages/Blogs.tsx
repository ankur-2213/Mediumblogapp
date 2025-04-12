import { AppBar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";


export const Blogs =()=>{
  const {loading, blogs, error} = useBlogs();
  if (error) {
    return (
        <div>
            <AppBar />
            <div className="flex justify-center mt-8">
                <div className="text-red-500">
                    Error loading blogs. Please try again later.
                </div>
            </div>
        </div>
    );
}
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
          <AppBar /> 
          <div className="flex justify-center">
              <div className="">
              {blogs?.map(blog => (
  <BlogCard 
    key={blog.id}
    id={blog.id}
    authorName={blog.author.name || "Anonymous"}
    title={blog.title}
    content={blog.content}
    publishedDate={"2nd feb 2024"}
  />
))}

              </div>
          </div>
      </div>
  );
      
  
    
}

