async function getArticle {
   try {
    const resp = await fetch()
    const json = await resp.json()

    console.log(json)
   }
   catch (error) {
       console.log(error)
   }
}