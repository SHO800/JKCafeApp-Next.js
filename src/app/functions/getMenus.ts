async function getMenus(url: string) {
    // APIからメニューを引っ張ってくる
    try {
        return await fetch(url, {cache: "no-cache"})
            .then(res => res.json())
    } catch (err) {
        console.log(err)
    }
}

export default getMenus;