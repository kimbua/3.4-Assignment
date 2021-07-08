
const languages = [
    'en',
    'es',
    'fr',
    'rs',
    'zh'
]
function renderLanguagesList() {
    const language = languages.map(l =>`<li><a class="dropdown-item" href="http://127.0.0.1:5500/index.html?language=${l}">${l}</a></li>`)
    document.getElementById('languages').innerHTML = language.join("")
}
renderLanguagesList()

const categories = [
    'general',
    'business',
    'health',
    'science',
    'sport',
    'technology',
    'entertainment'
]
function renderCategory() {
    const category = categories.map(c =>`<a class="text-light" href="http://127.0.0.1:5500/index.html?category=${c}">${c}</a>`)
    document.getElementById('categories').innerHTML = category.join("")
}
renderCategory()