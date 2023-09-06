export interface IUser {
  dateJoined?: string
  email?: string
  id: string
  isActive?: boolean
  isMember?: boolean
  isStaff?: boolean
  isSuperuser?: boolean
  lastLogin?: string
  name: string
  numberOfRegistrations?: number
  year: 'A_1_' | 'A_2_' | 'A_3_' | '-'
}
export interface IEvent {
  availableFrom?: string
  busAvailable?: boolean
  capacity: number
  created?: string
  date?: string
  description?: string
  id: string
  location?: string
  onlyMembers?: boolean
  registerOthers?: boolean
  // eslint-disable-next-line no-use-before-define
  registrations?: IRegistration[]
  title?: string
  veganAvailable?: boolean
}

export interface IRegistration {
  event?: IEvent
  id: string
  isVegan?: boolean
  registeredBy?: IUser
  timestamp?: string
  user: IUser
  usesBus?: boolean
}
