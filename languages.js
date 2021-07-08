const languages = [
    'en',
    'es',
    'fr',
    'rs',
    'zh'
]
function createLanguagesList() {
    const language = languages.map(l =>`<li><a class="dropdown-item" href="http://127.0.0.1:5500/index.html?language=${l}">${l}</a></li>`)
    document.getElementById('languages').innerHTML = language.join("")
}
createLanguagesList()