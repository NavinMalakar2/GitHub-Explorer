const GITHUB_API_BASE = 'https://api.github.com';

const handleResponce = async (response , errorMsg)=>{
    if(!response.ok){
        if(response.status===404 && errorMsg.includes('User')) throw new Error('User not Found')
            throw new Error(errorMsg)
    }
    return await response.json();
}

export const fetchUserProfile = async (username)=>{
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    return handleResponce(response ,"Failed to fetch user profile!");
}

export const fetchUserRepo = async (username , page=1, perPage=30)=>{
    const responce = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`);
    return handleResponce(responce , "Faild to fetch Repositories")
}

export const searchRepositories = async (query , page=1 , per_page=30 ,sort='stars',order = 'desc')=>{
const params =new URLSearchParams({q:query, page:page.toString(), per_page:per_page.toString(),sort, order});
const responce = await fetch(`${GITHUB_API_BASE}/search/repositories?${params.toString()}`);

return handleResponce(responce ,"Failed to search repositories")
}

export const searchRepoDetails = async (owner ,repo)=>{
    const responce =await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`)
    return handleResponce(responce ,"Failed to fetch repositories Details")
}
