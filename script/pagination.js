import { data, meta } from './data.js';

const listArticles = document.querySelector('[data-page]');
console.log('listArticles: ', listArticles);
// const pages = document.querySelectorAll('#pagination li');
// console.log('pages: ', pages);

const listPages = document.querySelector('#pagination');
const prev = document.querySelector('.footer__btn-previous');
const next = document.querySelector('.footer__btn-next');

let articlesOnPage = 4;
// let articlesOnPage = meta.pagination.limit;
let totalPages = meta.pagination.total;
let numberOfPages = Math.ceil(totalPages / articlesOnPage);
console.log('numberOfPages: ', numberOfPages);
let currentPage = 1;

let pages = [];
function showPagination(currentPage) {
    listPages.textContent = '';
    console.log(listPages);
    for (let i = currentPage; i < currentPage + 3; i++) {
        let page = document.createElement('li');
        page.classList.add('footer__page');
        page.textContent = i;
        listPages.append(page);
        pages.push(page);
    };
};

showPagination(currentPage);
showPage(pages[0]);



for (const item of pages) {
    item.addEventListener('click', function () {
        showPage(this);
    });
};

next.addEventListener('click', () => {
    if (currentPage === totalPages) {
        showPagination(currentPage);
        next.style.cssText = `
        display: none;
        `;
    } else {
        currentPage++;
        showPagination(currentPage);
    }
});

prev.addEventListener('click', () => {
    if (currentPage === 1) {
        showPagination(currentPage);
        prev.style.cssText = `
        display: none;
        `;
    } else {
        currentPage--;
        showPagination(currentPage);
    }
});

function showPage(item) {
    console.log('this.innerHTML: ', item.innerHTML);
    let active = document.querySelector('#pagination li.active');
    if (active) {
        active.classList.remove('active');
    };
    active = item;
    item.classList.add('active');
    let pageNum = +item.innerHTML;
    let startPage = (pageNum - 1) * articlesOnPage;
    let endPage = startPage + articlesOnPage;

    let paginatedArticles = data.slice(startPage, endPage);
    console.log('paginatedArticles', paginatedArticles);

    listArticles.textContent = '';

    function createListArticles() {
        for (const article of paginatedArticles) {
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

