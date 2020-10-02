const HOME = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
const NEW_STORIES = "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
const ASK = "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty";
const SHOW = "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty";
const JOBS = "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty";
const STORY = "https://hacker-news.firebaseio.com/v0/item/:id.json?print=pretty";
const SEARCH = "https://hn.algolia.com/api/v1/search?query=:query&hitsPerPage=30"

export const fetchSections = () => {
    const sections = Promise.all([
        fetch(HOME).then(res => res.ok && res.json() || Promise.reject(res)),
        fetch(NEW_STORIES).then(res => res.ok && res.json() || Promise.reject(res)),
        fetch(ASK).then(res => res.ok && res.json() || Promise.reject(res)),
        fetch(SHOW).then(res => res.ok && res.json() || Promise.reject(res)),
        fetch(JOBS).then(res => res.ok && res.json() || Promise.reject(res))
    ]);
    return sections;
}

export const fetchData = (ids) => {
    const data = Promise.all(
        ids.map(async (item) => {
            let url = STORY.replace(':id', item);
            const response = await fetch(url);
            const res = await response.json();
            return res;
        })
    )
    return data;
}

export const fetchId = async (id) => {
    const url = STORY.replace(':id', id)
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const fetchSearch = async (input) => {
    const url = SEARCH.replace(':query', input)
    const response = await fetch(url);
    const data = await response.json();
    const ids = data.hits.map(id => id.objectID);
    const res = fetchData(ids)
    return res;
}