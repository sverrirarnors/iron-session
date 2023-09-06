/* eslint-disable no-nested-ternary */
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { remark } from 'remark'
import html from 'remark-html'

import dayjs from 'dayjs'
import 'dayjs/locale/is'
// import { css } from '@emotion/react';

import { ChevronLeft } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

import ApolloWrapper from '@/clients/apolloWrapper'

// import Register from './Register';

import EventAvailable from './EventAvailable'
import { IEvent, IUser } from '@/types'

type Props = {
  event: IEvent
  user: {
    token: string
    isLoggedIn: boolean
    info: IUser
  }
}

const Event = ({ event, user }: Props) => {
  const descriptionHtml = remark().use(html).processSync(event.description).toString()

  dayjs.locale('is')
  const Register = dynamic(() => import('./Register'), {})

  return (
    <>
      <Link href="/events">
        <div className="mb-5 cursor-pointer text-muted-foreground font-medium hover:underline underline-offset-4 flex flex-row items-center">
          <ChevronLeft />
          Allir viðburðir
        </div>
      </Link>
      <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl mb-3">{event.title} </h1>
      <div className="flex flex-col lg:flex-row gap-3 mb-3">
        <h3 className="text-md text-muted-foreground flex flex-wrap">
          <svg
            className="fill-current text-muted-foreground mt-1.5 mr-2"
            height=".9em"
            width=".9em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </svg>
          {event.location}
        </h3>
        <h3 className="text-md text-muted-foreground flex flex-wrap">
          <svg
            className="fill-current text-muted-foreground mt-1 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            height=".9em"
            width=".9em"
            viewBox="0 0 20 20"
          >
            <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
          </svg>
          {dayjs(event.date).format('dddd D. MMMM kl. HH:mm')}
        </h3>
        <h3 className="text-md text-muted-foreground flex flex-wrap">
          <svg
            className="fill-current text-muted-foreground mt-1.5 mr-2"
            height=".9em"
            width=".9em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z" />
          </svg>
          {event.capacity} pláss
        </h3>
        <EventAvailable event={event} />
      </div>
      <Separator className="my-3" />

      {/* eslint-disable-next-line react/no-danger */}
      <div
        className="prose prose-invert lg:prose-lg"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
      <ApolloWrapper>
        <Register event={event} user={user} />
      </ApolloWrapper>
    </>
  )
}

export default Event
