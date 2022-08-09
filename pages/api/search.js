import ytsr from "ytsr"
export default async function Search(req, res) {
    const { method, body: { search } } = req
    try {
        if (method === 'POST') {
            const data = await ytsr(search)
            return res.send(data.items)
        } else {
            return res.status(403).send()
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send()
    }
}