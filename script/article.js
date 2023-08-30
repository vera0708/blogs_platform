import { loadArticle, loadAuthor } from './script.js';

const body = document.querySelector('body');

async function createArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const { data } = await loadArticle(id);
    const author = await loadAuthor(data.user_id);

    console.log('data  article.js', data);

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
        <p class="article__author">${author.data.name ? author.data.name : 'noname'}</p>
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
    body.append(article);
    return article;
};

createArticle();