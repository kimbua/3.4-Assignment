function produceUrl() {

    if (window.location.search) {
        const query = window.location.search
    .split("?")[1]
    .split("&")
    .map(
        qP => { 
            const [firstIndex, secondIndex] = qP.split("=")
            return {
                firstIndex,
                secondIndex
            }
        }
    )
    console.log(query)
    let url = `https://newsapi.org/v2/top-headlines?apiKey=893724683005487f80022e1701dd76f9`
    return query.map((q) => url += `&${q.firstIndex}=${q.secondIndex}`).join("")
    }else {
        return `https://newsapi.org/v2/top-headlines?apiKey=893724683005487f80022e1701dd76f9&language=en`
    }
}
let url = produceUrl()
let articles = []
async function getArticles() {
   try {
    const resp = await fetch(url)
    const json = await resp.json()
    articles = json.articles
    localStorage.setItem("articles", JSON.stringify(articles) )

    console.log(json)
}
catch (error) {
    console.log(error)
    articles = JSON.parse(localStorage.getItem("articles"))
}finally {
    renderArticles(articles)

}
}
getArticles()

function renderArticles(a) {
    const goodArticles = a.filter(a=>a.author)
    const article = goodArticles.map( a=> {
        // const content = a.content.split('[')[0]
        return `<div class="article">
            <h3>${a.title}</h3>
            <h6><i>By ${a.author}</i></h6>
            <div class="article-flex">
            <div class="img-con">
            <img src="${a.urlToImage}" alt="${a.title}">
            </div>
            <div class="content-con">
            <h5>${a.content}</h5>
            <button class="btn btn-outline-dark" type="button" onclick="window.location.href='${a.url}';">Read More</button>
            </div>
            </div>
            
        </div>`
    });
    document.getElementById("articles").innerHTML = article.join('')
    document.getElementById("title").innerHTML = `${window.location.search.split("?")[1].split("&")[0].split("=")[1]} News (${article.length})` 
    
}

