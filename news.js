let pageNumber = 1
function produceUrl() {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=ee29474c015d43c4bc326a471dce6b1f&page=${pageNumber}`
    const urlParam = window.location.search.split("?")[1]
    if (!urlParam) {
        url += `&language=en`
        console.log(url)
        return url 
    }
    urlParam.split("&").map(
        qP => { 
            const [key, value] = qP.split("=")
            url += `&${key}=${value}`
        })

    console.log(url)
      
    return url
}

let articles = []
let allArticles = []

function runSearch(q){
     let url = `https://newsapi.org/v2/top-headlines?apiKey=ee29474c015d43c4bc326a471dce6b1f&page=${pageNumber}&q=hello`
    return url
}
async function getArticles(q) {
    let url=""
    if (q) {
        url = await runSearch(q)
    }else {
        url = produceUrl()
    }

    try {
    console.log(url)
    const resp = await fetch(url)
    const json = await resp.json()
    articles = json.articles
    allArticles = allArticles.concat(articles)

    localStorage.setItem("allArticles", JSON.stringify(allArticles) )

    console.log(json)
    renderArticles(allArticles)
}
catch (error) {
    console.log(error)
    allArticles = JSON.parse(localStorage.getItem("allArticles"))
}
}
getArticles()

function renderArticles(a) {
    const goodArticles = a.filter(a=>a.author)
    const article = goodArticles.map( (a,index)=> {
        // const content = a.content.split('[')[0]
        return `<div class="article">
            <h3>${index+1}. ${a.title}</h3>
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
    document.getElementById("title").innerHTML = `News (${article.length})` 
    
}
function loadMore(){
    pageNumber++ 
    getArticles()
}

function searchEngine() {
    const q = document.getElementById("searchTerm").value
    console.log(q)
    document.getElementById("searchTerm").innerHTML = ""
    getArticles(q)
}