import { Card } from 'konsta/react'
import abbreviate from 'number-abbreviate'
import NextLink from 'next/link'
export default function Video({ data }) {
    return (
        <Card
            margin='m-0'
            className='!rounded-lg cursor-pointer'
            header={
                <NextLink href={`/video/${data.id}`} passHref>
                    <div className="-mx-4 -my-2 relative h-48 lg:h-40">
                        <img
                            alt={data.title}
                            src={data.bestThumbnail.url}
                            className="h-full w-full object-cover" />
                    </div>
                </NextLink>
            }>
            <div className='flex gap-3'>
                <div className='flex-[48px]'>
                    <img
                        alt={data.title}
                        src={data.author.bestAvatar.url}
                        className="h-12 w-12 object-cover rounded-full" />
                </div>
                <div className='flex-[calc(100%-48px)]'>
                    <div>
                        <span>{data.title.length > 30 ? `${data.title.substring(0, 30)}...` : data.title}</span>
                    </div>
                    <div className='flex flex-col mt-1.5'>
                        <span className='dark:text-zinc-400'>{data.author.name}</span>
                        <div className='flex gap-2 items-center'>
                            <span className='dark:text-zinc-400'>{abbreviate(data.views)} views</span>
                            <span className='bg-zinc-400 h-1 w-1 rounded-full' />
                            <span className='dark:text-zinc-400'>{data.uploadedAt || 'Not Available'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}