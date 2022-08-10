import ytsr from "ytsr"
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export default async function Videos(req, res) {
    const { method } = req
    try {
        if (method === 'GET') {
            const data = await ytsr(letters[Math.floor((Math.random() * letters.length))])
            return res.send(data.items)
        } else {
            return res.status(403).send()
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send()
    }
}