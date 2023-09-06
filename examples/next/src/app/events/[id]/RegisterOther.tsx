'use client'
/* eslint-disable react/jsx-props-no-spreading */
import * as z from 'zod'
import i18next from 'i18next'
import { zodI18nMap } from 'zod-i18n-map'
import translation from 'zod-i18n-map/locales/is/zod.json'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQuery, gql } from '@apollo/client'

import { Loader2, Check, ChevronsUpDown } from 'lucide-react'

import { useState } from 'react'
import { cn } from '@/components/lib/utils'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'

const USER_QUERY = gql`
  query userQuery($token: String!, $name: String) {
    users(token: $token, name_Icontains: $name, first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

i18next.init({
  lng: 'is',
  resources: {
    is: { zod: translation },
  },
})

z.setErrorMap(zodI18nMap)

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nafn verður að vera að minnsta kosti 1 stafur' })
    .max(150, { message: 'Nafn má að hámarki vera 50 stafir' }),
})
interface Props {
  token: string
  // eslint-disable-next-line no-unused-vars
  register: (anotherUser: String) => Promise<any>
  refetchRegistrations: () => Promise<any>
}

export default function RegisterOther({ token, register, refetchRegistrations }: Props) {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { data } = useQuery(USER_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      token,
      name: form.getValues('name'),
    },
  })
  const { toast } = useToast()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    register(values.name)
      .then(async () => {
        toast({
          title: 'Notandi skráður',
          description: `${values.name} hefur verið skráð/ur á viðburðinn`,
        })
        refetchRegistrations()
        setOpen(false)
        form.reset()
      })
      .catch((error) => {
        toast({
          title: 'Villa við að skrá notanda',
          description: error.message,
          variant: 'destructive',
        })
        form.resetField('name')
      })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="secondary" className="w-full sm:w-auto my-3 sm:ml-3 sm:mr-2 sm:my-auto">
          Skrá annan notanda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3">Skrá annan notanda</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nafn</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? field.value : 'Veldu notanda'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Leitaðu að notanda..." />
                          <CommandEmpty>Enginn notandi fannst.</CommandEmpty>
                          <CommandGroup>
                            {data.users?.edges.map((user: any) => (
                              <CommandItem
                                value={user.node.name}
                                key={user.node.id}
                                onSelect={() => {
                                  form.setValue('name', user.node.name)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    user.node.name === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {user.node.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  {/* <FormDescription>
                    Hérna getur þú leitað að notandanum sem þú vilt skrá á viðburðinn
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormMessage>
              {error?.graphQLErrors.map(({ message }, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <p key={i}>{message}</p>
              ))}
            </FormMessage> */}
            <Button type="submit" disabled={false}>
              {false && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Skrá notanda á viðburð
            </Button>
            {/* <DialogFooter>
          <DialogClose>
            <Button type="submit">Breyta notendaupplýsingum</Button>
          </DialogClose>
        </DialogFooter> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
