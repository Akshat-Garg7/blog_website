import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";


export const AppContext=createContext();

function AppContextProvider({children})
{
    const [loading,setLoading]=useState(false);
    const [posts,setPosts]=useState([])
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(null);

    async function fetchBlogPosts(page=1)
    {
        setLoading(true);
        try{
            const result =await fetch(`${baseUrl}?page=${page}`);
            const data=await result.json();
            console.log(data);
            setPage(data?.page);
            setPosts(data?.posts);
            setTotalPages(data?.totalPages);
        }
        catch(error){
            console.log("Error");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }
    function handlerPageChange(page) {
        setPage(page);
        fetchBlogPosts(page);
    }

    const value={
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        setTotalPages,
        loading,
        setLoading,
        handlerPageChange,
        fetchBlogPosts
    };
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;