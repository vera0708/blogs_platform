// import { data, meta } from './data.js';
import { loadData } from './script.js';

let currentPage = 1;

const loadedData = await loadData(currentPage);
// console.log('loadData: ', loadedData.meta.pagination.limit);
let meta = loadedData.meta;
let data = loadedData.data;
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
    let totalArticles = meta.pagination.total;
    let numberOfPages = Math.ceil(totalArticles / articlesOnPage);
    // console.log('numberOfPages: ', numberOfPages, meta.pagination.pages);
    let pages = [];

    showPagination(1);
    showPage(pages[0]);
    setArrowsVisibility();
    setClicksHandler();

    next.addEventListener('click', async () => {
        if (currentPage === numberOfPages) {
            return;
        }

        currentPage++;
        showPagination(currentPage);
        await updateData();
        showPage(pages[currentPage - 1]);
        setArrowsVisibility();
    });

    prev.addEventListener('click', async () => {
        if (currentPage === 1) {
            return;
        }

        currentPage--;
        showPagination(currentPage);
        await updateData();
        showPage(pages[currentPage - 1]);
        setArrowsVisibility();
    });

    function createListArticles(paginatedArticles) {
        for (const article of paginatedArticles) {
            let blogLink = document.createElement('a');
            blogLink.classList.add('blog__link');
            blogLink.href = `article.html?id=${article.id}`;
            let blogItem = document.createElement('li');
            blogItem.classList.add('blog__item');

            const blogImage = document.createElement('img');
            blogImage.classList.add('blog__img');
            blogImage.src = 'img/1_shoos.png';

            const blogContent = document.createElement('div');
            blogContent.classList.add('blog__content');

            const blogTitle = document.createElement('h1');
            blogTitle.classList.add('blog__title');
            blogTitle.textContent = article.title;
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

    function showPagination(currentPage) {
        pages = [];
        listPages.textContent = '';
        const mod = (currentPage - 1) % 3;

        for (let i = currentPage - mod; i < currentPage + 3 - mod; i++) {
            let page = document.createElement('li');
            page.classList.add('footer__page');
            page.textContent = i;
            if (currentPage === i) {
                page.classList.add('active')
            }
            listPages.append(page);
            pages.push(page);
        };
        setClicksHandler();
    };

    async function showPage() {
        listArticles.textContent = '';
        createListArticles(data);
    };

    async function updateData() {
        const loadedPageData = await loadData(currentPage);
        data = loadedPageData.data;
        meta = loadedPageData.meta;
    }

    function setClicksHandler() {
        for (const item of pages) {
            item.addEventListener('click', async function () {
                console.log('item:', item);
                currentPage = Number(item.innerHTML);
                showPagination(currentPage);
                await updateData();
                showPage(pages[currentPage - 1]);
            });
        };
    };

    function setArrowsVisibility() {
        if (currentPage === numberOfPages) {
            next.style.cssText = 'display: none;';
            // next.setAttribute("disabled", "true");
        } else {
            next.style.cssText = 'display: block;';
        }

        if (currentPage === 1) {
            prev.style.cssText = 'display: none;';
        } else {
            prev.style.cssText = 'display: block;';
        }
    }
};

getPagination();