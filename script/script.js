const loadBlogs = async () => {
    const result = await fetch('https://gorest.co.in/public-api/posts');
    const data = await result.json();
    console.log('data из script: ', data);
    return data;
}

loadBlogs();
