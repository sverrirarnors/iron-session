'use client'
import dayjs from 'dayjs'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { yearToString } from '@/utils'
import { IRegistration } from '@/types'

type Props = {
  registrations: IRegistration[]
  capacity: number
}
const RegistrationTable = ({ registrations, capacity }: Props) => (
  <div className="py-6 min-w-full rounded-sm">
    <Table>
      <TableHeader>
        <TableRow className="h-2">
          <TableHead className="table-head w-5" />
          <TableHead className="table-head">Nafn</TableHead>
          <TableHead className="table-head hidden md:table-cell">Ár</TableHead>
          <TableHead className="table-head hidden md:table-cell">Tímasetning</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {registrations &&
          registrations.map((registration, i) => (
            <>
              {i === capacity && (
                <TableRow key={`waitlist-${registration.id}`}>
                  <TableCell colSpan={4} className=" py-5 text-muted-foreground">
                    Biðlisti
                  </TableCell>
                </TableRow>
              )}
              <TableRow key={`row-${registration.id}`}>
                <TableCell key={`no-${registration.id}`} className="">
                  {i + 1}
                </TableCell>
                <TableCell key={`name-${registration.id}`} className="text-medium">
                  {registration.user.name}
                </TableCell>
                <TableCell key={`year-${registration.id}`} className="hidden md:table-cell">
                  {yearToString(registration.user.year)}
                </TableCell>
                <TableCell
                  key={`datetime-${registration.id}`}
                  className="hidden md:table-cell text-muted-foreground"
                >
                  {dayjs(registration.timestamp).format('DD/MM/YYYY kl. HH:mm:ss')}
                </TableCell>
              </TableRow>
            </>
          ))}
        {/* <Tabl key="loading">
          <td
            className={classNames(
              loading ? 'visible' : 'invisible',
              'mx-auto',
              'text-center',
              'py-3',
            )}
            colSpan={4}
          >
            <SquareLoader color="white" size="20px" css={spinnerStyles} />
          </td>
        </tr> */}
      </TableBody>
    </Table>
  </div>
)

export default RegistrationTable
