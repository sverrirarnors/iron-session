import { readCookieFromStorageServerAction } from '../../serverActions'

import Event from './Event'

// import dynamic from 'next/dynamic';

// import { gql } from '@apollo/client';
// import { getClient } from '@/clients/apolloClient';

const fetchAPI = async (query: string, variables: object) => {
  if (!process.env.NEXT_PUBLIC_API) {
    throw new Error('NEXT_PUBLIC_API is not defined')
  }
  const result = await fetch(process.env.NEXT_PUBLIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const data = await result.json()
  return data
}

const GET_EVENT = `
query singleEvent($id: ID!, $token: String!){
    event(id: $id, token: $token){
      id
      title
      description
      capacity
      location
      availableFrom
      onlyMembers
      date
      registerOthers
      busAvailable
      veganAvailable
    }
  }
`

export default async function EventPage({ params }: { params: { id: number } }) {
  // const client = getClient()

  const user = await readCookieFromStorageServerAction()
  // // const user = {
  // //   isLoggedIn: true,
  // //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2YTE5QGhpLmlzIiwiZXhwIjoxNjkzOTY1NTcxLCJvcmlnSWF0IjoxNjkzOTE1MTcxfQ.BtNbG2CQh5maa5XncitNZnF1sd8cIgbpMPI68B5lBps",
  // //   info: {
  // // 		id: "1",
  // // 		name: "Sverrir Arnórsson",
  // // 		year: 'A_1_',
  // // 		isMember: false
  // // 	}
  // // }

  // const { data } = await client.query({
  //     query: GET_EVENT,
  //     variables: {
  //         id: params.id,
  //         token: user.token
  //     }
  // })
  const { data } = await fetchAPI(GET_EVENT, {
    id: params.id,
    token: user.token,
  })
  // // const data = {
  // //     event: {
  // //       id: "65",
  // //       title: "Aðalfundur, gaman gaman",
  // //       description: "Aðalfundur Vélarinnar verður haldinn í Leiknisheimilinu.\r\n\r\nÞarffer fram kostning til stórnarsetu fyrir skóla árið 2023-2024.\r\n\r\nBoðið verður upp á mat og léttar veitingar.\r\n\r\nMeð léttum veitingum þá er átt við áfengi, gott áfengi, mikið af því.\r\n\r\nÖllum vélmennum velkomið að mæta, vinsamlegast skráið ykkur til að hægt sé að áætla fjölda í rútu og áfengis magn.\r\n\r\nxoxo Vélin",
  // //       capacity: 999,
  // //       location: "Austurberg 1, 111 Reykjavík",
  // //       availableFrom: "2023-03-29T12:50:00+00:00",
  // //       onlyMembers: true,
  // //       date: "2023-03-31T20:00:00+00:00",
  // //       registerOthers: false,
  // //       busAvailable: true,
  // //       veganAvailable: true
  // //     }
  // // }
  if (data?.event) {
    return <Event event={data.event} user={user} />
  }
  return 'Viðburður fannst ekki'
}
