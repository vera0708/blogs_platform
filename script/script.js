const loadData = async (page) => {
    const result = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
    const data = await result.json();
    // console.log('data из script: ', data);
    return data;
}

const loadArticle = async (id) => {
    const result = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
    const data = await result.json();
    // console.log('data из script: ', data);
    return data;
};

const loadAuthor = async (id) => {
    const result = await fetch(`https://gorest.co.in/public-api/users/${user_id}`);
    const data = await result.json();
    // console.log('data из script: ', data);
    return data;
};

export { loadData, loadArticle, loadAuthor };
