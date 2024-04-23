const apiKey = "c65853e80f944f7e93ee085a040a7485";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', function(){
    fetchNews("India");
})

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await response.json();
    // console.log(data);
    // console.log(data.articles);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTittle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    newsImg.src = article.urlToImage;
    newsTittle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {timeZone: "Asia/Jakarta"});

    newsSource.innerHTML =`${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener("click", function(){
        window.open(article.url, "_blank");
    });
}

let curSelectorNav = null;
function onClickNavItem(searchQuery){
    fetchNews(searchQuery);
    const navItem = document.getElementById(searchQuery);
    curSelectorNav?.classList.remove('active');
    curSelectorNav = navItem;
    curSelectorNav.classList.add('active');
}

const inputText = document.getElementById('search-area');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener("click", function(){
    const info = inputText.value;
    if(!info) return;
    fetchNews(info);
    curSelectorNav.classList.remove('active');
    curSelectorNav = null;
})