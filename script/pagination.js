// import { data, meta } from './data.js';
import { loadData } from './script.js';

const loadedData = await loadData();
// console.log('loadData: ', loadedData.meta.pagination.limit);
const meta = loadedData.meta;
const data = loadedData.data;
console.log('Data: ', loadedData.data);

const getPagination = () => {
    const listArticles = document.querySelector('[data-page]');
    console.log('listArticles: ', listArticles);
    // const pages = document.querySelectorAll('#pagination li');
    const listPages = document.querySelector('#pagination');
    const prev = document.querySelector('.footer__btn-previous');
    const next = document.querySelector('.footer__btn-next');

    // let articlesOnPage = 4;
    let articlesOnPage = meta.pagination.limit;
    let totalPages = meta.pagination.total;
    let numberOfPages = Math.ceil(totalPages / articlesOnPage);
    console.log('numberOfPages: ', numberOfPages);
    let currentPage = 1;
    let pages = [];

    showPagination(1);
    showPage(pages[0]);

    for (const item of pages) {
        item.addEventListener('click', function () {
            console.log('item:', item);
            showPage(this);
        });
    };

    next.addEventListener('click', () => {
        if (currentPage === totalPages) {
            showPagination(totalPages);
            showPage(pages[totalPages - 1]);
            next.style.cssText = `
        display: none;
        `;
        } else {
            currentPage++;
            showPagination(currentPage);
            showPage(pages[currentPage - 1]);
        }
    });

    prev.addEventListener('click', () => {
        if (currentPage === 1) {
            showPagination(1);
            showPage(pages[0]);
            prev.style.cssText = `
        display: none;
        `;
        } else {
            currentPage--;
            showPagination(currentPage);
            showPage(pages[currentPage - 1]);
        }
    });

    function createListArticles(paginatedArticles) {
        for (const article of paginatedArticles) {
            let blogLink = document.createElement('a');
            blogLink.classList.add('blog__link');
            blogLink.href = `article.html`;
            // blogLink.href = `blog.html?page=${pageNum}`;
            let blogItem = document.createElement('li');
            blogItem.classList.add('blog__item');

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

    function createArticle() {
        const article = document.createElement('article');
        article.classList.add('article');
        const header = document.createElement('header');
        header.classList.add('article__header');
        header.innerHTML = `
            <a href="blog.html" target="_blank" class="header__link">Главная</a>
            <svg class="header__svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.44238 12.4425L9.87738 9L6.44238 5.5575L7.49988 4.5L11.9999 9L7.49988 13.5L6.44238 12.4425Z" fill="#525252" />
            </svg>
            <a href="mainPage.html" target="_blank" class="header__link">Блог</a>
            <svg class="header__svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.44238 12.4425L9.87738 9L6.44238 5.5575L7.49988 4.5L11.9999 9L7.49988 13.5L6.44238 12.4425Z" fill="#525252" />
            </svg>
            <a href="article.html?id=${data.id}" target="_blank" class="header__link">Как ухаживать за обувью из кожи</a>
        `;
        const articleBlock = document.createElement('div');
        articleBlock.classList.add('article__block');
        const articleContent = document.createElement('div');
        articleContent.classList.add('article__content');
        const articleTitle = document.createElement('h1');
        articleTitle.classList.add('article__title');
        articleTitle.textContent = `${data.title}`;
        const articleText = document.createElement('p');
        articleText.classList.add('article__text');
        articleText.textContent = `${data.title}`;
        const articleBottom = document.createElement('div');
        articleBottom.classList.add('article__bottom');
        articleBottom.innerHTML = `
            <a href="blog.html" class="article__bottom-return">К списку статей</a>
            <div class="article__bottom-info">
                <p class="article__author">${data.user_id}</p>
                <p class="article__data">22 октября 2021, 12:45</p>
                <div class="blog__info">
                    <div class="blog__info-view">1.2K</div>
                    <div class="blog__info-comment">0</div>
                </div>
            </div>
        `;
        articleContent.append(articleTitle, articleText, articleBottom);

        const articlePromo = document.createElement('li');
        articlePromo.classList.add('article__promo');
        articlePromo.innerHTML = `
            <li class="article__promo-item">
                <img class="article__promo-img" src="./img/Promo-1.png" width="532" alt="Фото рекламы 1">
                <div class="article__promo-block">
                    <h4 class="article__promo-block-title">Горящие туры в Стамбул от 20 000 руб.</h4>
                    <p class="article__promo-block-text">Окунись в настоящую восточную сказку</p>
                </div>
            </li>
            <li class="article__promo-item">
                <img class="article__promo-img" src="./img/Promo-2.png" width="532" alt="Фото рекламы 2">
                <div class="article__promo-block">
                    <h4 class="article__promo-block-title">Новый RENAULT DUSTER</h4>
                    <p class="article__promo-block-text">Легендарный внедорожник в новом дизайне</p>
                </div>
            </li>
        `;
        articleBlock.append(articleContent, articlePromo);
        article.append(header, articleBlock);
        return article;
    };

    function showPagination(currentPage) {
        listPages.textContent = '';
        /*if (currentPage === 1) {
            prev.style.cssText = `display: none;`;
        }*/
        console.log('listPages', listPages);
        for (let i = currentPage; i < currentPage + 3; i++) {
            let page = document.createElement('li');
            page.classList.add('footer__page');
            page.textContent = i;
            listPages.append(page);
            pages.push(page);
        };
    };

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

        createListArticles(paginatedArticles);
    };
};

getPagination();