import useSWR from "swr"
const fetcher = (...args) => fetch(...args).then(res => res.json())
export default function Videos() {
    const { data, error } = useSWR('/api/videos', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    })
    return {
        data: data,
        dataLoading: !error && !data,
        dataError: error
    }
}