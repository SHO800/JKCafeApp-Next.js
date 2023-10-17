async function getClientId(url: string) {
    // APIからメニューを引っ張ってくる
    try {
        return await fetch(url, {cache: "no-cache"})
            .then(res => res.json())
            .then(value => value["clientId"])
    } catch (err) {
        console.log(err)
    }
}

export default getClientId;