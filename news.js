async function getArticles() {
   try {
    const resp = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=893724683005487f80022e1701dd76f9`)
    const json = await resp.json()
    const articles = json.articles
    renderArticles(articles)
    console.log(json)
   }
   catch (error) {
       console.log(error)
   }
}
getArticles()

function renderArticles(a) {
    const goodArticles = a.filter(a=>a.author)
    const article = goodArticles.map( a=> {
        // const content = a.content.split('[')[0]
        return `<div class="article container">
            <h3>${a.title}</h3>
            <h6><i>By ${a.author}</i></h6>
            <img src="${a.urlToImage}" alt="${a.title}">
        <h5>${a.content}</h5>
        <button class="btn btn-outline-dark" type="button" onclick="window.location.href='${a.url}';">Read More</button>
        </div>`
    });
    document.getElementById("articles").innerHTML = article.join('')
}