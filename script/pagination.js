import { data, meta } from './data.js';

const listArticles = document.querySelector('[data-page]');
console.log('listArticles: ', listArticles);
// const pages = document.querySelectorAll('#pagination li');
// console.log('pages: ', pages);
const listPages = document.querySelector('#pagination');

let articlesOnPage = 3;

let countOfPages = Math.ceil(meta.pagination.total / meta.pagination.pages);
console.log('countOfPages: ', countOfPages);

let pages = [];
for (let i = 1; i <= 3; i++) {
    let page = document.createElement('li');
    page.classList.add('footer__page');
    page.textContent = i;
    listPages.append(page);
    pages.push(page);
};

let active;
for (const item of pages) {
    item.addEventListener('click', function () {
        showPage(this);

    });
};

function showPage(item) {
    console.log('this.innerHTML: ', item.innerHTML);
    if (active) {
        active.classList.remove('active');
    };
    active = item;
    item.classList.add('active');
    let pageNum = +item.innerHTML;
    let startPage = (pageNum - 1) * articlesOnPage;
    let endPage = startPage + articlesOnPage;

    let articles = data.slice(startPage, endPage);
    console.log('articles', articles);

    listArticles.textContent = '';

    function createListArticles() {
        for (const article of articles) {
            let blogLink = document.createElement('a');
            blogLink.classList.add('blog__link');
            blogLink.href = `article.html`;
            // link.href = `tel:${phone}`;
            let blogItem = document.createElement('li');
            blogItem.classList.add('blog__item');
            /* let div;
             div = document.createElement('div');*/

            const blogImage = document.createElement('img');
            blogImage.classList.add('blog__img');
            blogImage.src = 'img/1_shoos.png';

            const blogContent = document.createElement('div');
            blogContent.classList.add('blog__content');

            const blogTitle = document.createElement('h1');
            blogTitle.classList.add('blog__title');
            blogTitle.textContent = `Как ухаживать за обувью из кожи`;
            // blogTitle.textContent = `${}`;
            const blogData = document.createElement('p');
            blogData.classList.add('blog__data');
            blogData.textContent = `22 октября 2021, 12:45`;
            const blogInfo = document.createElement('div');
            blogInfo.classList.add('blog__info');

            const blogView = document.createElement('div');
            blogView.classList.add('blog__info-view');
            blogView.innerHTML = `1.2K`;
            const blogComment = document.createElement('div');
            blogComment.classList.add('blog__info-comment');
            blogComment.innerHTML = `${article.id}`;

            blogInfo.append(blogView, blogComment);
            blogContent.append(blogTitle, blogData, blogInfo);
            blogItem.append(blogImage, blogContent);
            blogLink.append(blogItem);
            listArticles.append(blogLink);
        }
    };
    createListArticles();
}

