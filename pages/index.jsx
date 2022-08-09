import Head from "next/head"
import { Navbar, Page, List, ListInput, Preloader } from 'konsta/react'
import { useState } from "react"
import { config } from '../lib'
import { Video } from '../components'
export default function Index({ data }) {
  const [searchData, setSearchData] = useState({
    isSearching: false,
    search: undefined,
    data: JSON.parse(data)
  })
  const search = async () => {
    await fetch('/api/search', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ search: searchData.search })
    }).then(async (req) => {
      if (req.ok) {
        const data = await req.json()
        setSearchData({ ...searchData, data: data, isSearching: false })
      }
    }).catch((e) => {
      setSearchData({ ...searchData, isSearching: false })
    })
  }
  console.log(searchData)
  return (
    <Page>
      <Head>
        <title>{config.APPNAME}</title>
      </Head>
      <Navbar
        title={config.APPNAME} />
      <List hairlines={false} margin="m-0">
        <ListInput
          placeholder="Search"
          type="search"
          onKeyPress={(e) => {
            if (e.code === 'Enter' && searchData.search && !searchData.isSearching) {
              setSearchData({ ...searchData, isSearching: true })
              search()
            }
          }}
          onInput={(e) => setSearchData({ ...searchData, search: e.target.value })}
          media={searchData.isSearching && <Preloader size="w-6 h-6" />} />
      </List>
      {/* Search results */}
      {searchData.data.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-4 py-5 px-2">
          {searchData.data.map((data, i) => (
            data.type === 'video' ? <Video key={i} data={data} /> : ''
          ))}
        </div>
      )}
    </Page>
  )
}
export async function getServerSideProps(ctx) {
  let result = []
  await fetch(`${ctx.req.headers['x-forwarded-proto']}://${ctx.req.headers.host}/api/search`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ search: 'all' })
  }).then(async (req) => {
    if (req.ok) {
      result = await req.json()
    }
  })
  return {
    props: {
      data: JSON.stringify(result)
    }
  }
}
