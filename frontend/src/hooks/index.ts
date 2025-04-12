import { useEffect, useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config";
export interface Blog{
   "content":string;
   "title":string;
   "id":number
   "author":{
    "name":string
   }
}
export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | undefined>(undefined);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.data && response.data.blog) {
                setBlog(response.data.blog);
            } else {
                console.error("Unexpected response format:", response.data);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching blog:", err);
            setError(err);
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog,
        error
    };
};
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            // Add a safety check for the response structure
            if (response.data && Array.isArray(response.data.blogs)) {
                setBlogs(response.data.blogs);
            } else {
                console.error("Unexpected response format:", response.data);
                setBlogs([]);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching blogs:", err);
            setError(err);
            setLoading(false);
        });
    }, []);

    return {
        loading,
        blogs,
        error
    };
};