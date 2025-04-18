import {Link} from 'react-router-dom';

interface BlogCardProps {
    id:number;
    authorName : string;
    title:string;
    content:string;
    publishedDate: string;
}


export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) =>{
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
           <Avatar name={authorName}/> 
           <div className="flex justify-center flex-col font-extralight pl-2">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle></Circle>
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
           
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div>
            {content.slice(0,100)+"..."}
        </div>
        <div className="w-full text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minute(s)`}
        </div>
        
    </div>
    </Link> 
}

export function Avatar({ name,size="small" }:{name: any,size?:"small"|"big"}){
    
return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size==="small"?"w-6 h-6":"w-10 h-10"}`}>
    <span className={`${size==="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>


}
export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}