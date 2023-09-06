import dayjs from 'dayjs'
import 'dayjs/locale/is'
import { IEvent } from '@/types'

export default function EventAvailable({ event }: { event: IEvent }) {
  dayjs.locale('is')
  return (
    <>
      {dayjs(event.availableFrom).valueOf() - dayjs().valueOf() > 0 && (
        <h3 className="text-md text-muted-foreground flex flex-wrap">
          <svg
            className="fill-current text-muted-foreground mt-1 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            height=".9em"
            width=".9em"
            viewBox="0 0 20 20"
          >
            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
          </svg>
          Skráning hefst {dayjs(event.availableFrom).format('D. MMMM kl. HH:mm')}
        </h3>
      )}
    </>
  )
}
