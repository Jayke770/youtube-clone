import Head from "next/head"
import { Navbar, Page, Preloader, Card, Button } from 'konsta/react'
import { useState, useEffect } from "react"
import { config, videos } from '../lib'
import { Video } from '../components'
export default function Index() {
  const { data } = videos()
  const [videosData, setvideosData] = useState({
    isSearching: false,
    search: undefined,
    data: []
  })
  //initial videos
  useEffect(() => {
    if (data) {
      setvideosData({ ...videosData, data: data })
    }
  }, [setvideosData, data])
  //search videos
  const search = async () => {
    await fetch('/api/videos/search', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ search: videosData.search })
    }).then(async (req) => {
      if (req.ok) {
        const data = await req.json()
        setvideosData({ ...videosData, data: data, isSearching: false })
      }
    }).catch((e) => {
      setvideosData({ ...videosData, isSearching: false })
    })
  }
  return (
    <Page>
      <Head>
        <title>{config.APPNAME}</title>
      </Head>
      <Navbar
        title={config.APPNAME} />
      <Card
        margin="m-0"
        className="w-full">
        <div className="relative">
          <input
            type={'text'}
            placeholder="Search Videos"
            onInput={(e) => setvideosData({ ...videosData, search: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setvideosData({ ...videosData, isSearching: true })
                search()
              }
            }}
            className="w-full outline-none pl-2.5 pr-10 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-300" />
          <div className="absolute top-0 h-full flex justify-center items-center right-1.5">
            {!videosData.isSearching ? (
              <Button
                clear
                colors={{
                  bg: 'bg-zinc-800',
                  activeBgDark: 'bg-zinc-700'
                }}
                onClick={() => {
                  setvideosData({ ...videosData, isSearching: true })
                  search()
                }}
                className="!w-auto dark:bg-zinc-800">Search</Button>
            ) : <Preloader size="w-6 h-6" />}
          </div>
        </div>
      </Card>
      {/* Search results */}
      {videosData.data.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-4 py-3 md:py-5 px-2">
          {videosData.data.map((data, i) => (
            data.type === 'video' ? <Video key={i} data={data} /> : ''
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full py-5">
          <Preloader />
        </div>
      )}
    </Page>
  )
}
