"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';

import {
    ApolloError, gql, useQuery, useMutation,
  } from '@apollo/client';

import { Button } from '@/components/ui/button';
import { Checkbox as UICheckbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';


import { Loader2 } from 'lucide-react';

import Countdown from 'react-countdown';

import dayjs from 'dayjs';
import 'dayjs/locale/is';



const parseError = (error: ApolloError) => (
  error.graphQLErrors.map(({ message }, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <p className="text-red-400" key={i}>{message}</p>
  )));

  export const canRegister = (
    user: {
          isLoggedIn: boolean,
          token: string,
          info: IUser
          },
        event: IEvent
  ) => (
    user?.isLoggedIn
      && (
        (event?.onlyMembers && user?.info.isMember)
        || (event && event.onlyMembers))
  );

  type CheckBoxProps = {
    label: string,
    name: string,
    value: boolean,
    onChange: any,
  }
  const Checkbox = ({
    label, name, value, onChange,
  }: CheckBoxProps) => (
    <>
      <UICheckbox
        name={name}
        id={name}
        checked={value}
        onCheckedChange={onChange}
        // disabled={!canRegister || metaLoading}
        className="my-3 mx-auto sm:ml-3 sm:mr-2 sm:my-auto"
      />
      <label htmlFor={name} className="mx-auto sm:ml-1 sm:mr-2 sm:my-auto">{label}</label>
    </>
  );


import {
  IEvent, IUser
} from '@/types';

const GET_REGISTRATIONS = gql`
query registrations($eventId: ID!, $token: String!){
  registrations(eventId: $eventId, token: $token) {
    id
    timestamp
    user {
      id
      name
      year
    }
  }
}
`;
const IS_REGISTERED = gql`
query isRegistered($eventId: ID!, $token: String!){
  isRegistered(eventId: $eventId, token: $token)
}
`;

const GET_REGISTRATION = gql`
query registration($id: ID!, $token: String!){
  registration(eventId: $id, token: $token) {
    id
    isVegan
    usesBus
  }
}
`;
const REGISTER = gql`
mutation register($eventId: ID!, $token: String!, $anotherUser: String){
    createRegistration(eventId: $eventId, token: $token, anotherUser: $anotherUser) {
      event {
        id
        location
      }
    }
  }
`;

const DELTE_REGISTRATION = gql`
mutation deleteRegistration($eventId: ID!, $token: String!){
    deleteRegistration(eventId: $eventId, token: $token) {
      event {
        id
        location
      }
    }
  }
`;

const UPDATE_REGISTRATION = gql`
mutation updateRegistration($token: String!, $id: ID!, $isVegan: Boolean, $usesBus: Boolean) {
  uptdateRegistrationMeta(token: $token, registrationId: $id, isVegan: $isVegan, usesBus: $usesBus) {
    registration {
      id
      isVegan
      usesBus
    }
}
}
`;

interface RegisterProps {
    event: IEvent;
    user: {
        token: string;
        isLoggedIn: boolean;
        info: IUser;
    };
}
export default function Register({ event, user }: RegisterProps) {
    dayjs.locale('is');

    const [usesBus, setUsesBus] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const {
      loading: isRegisteredLoading,
      error: isRegisteredError,
      data: isRegisteredData,
      refetch: refetchIsRegistered,
    } = useQuery(
      IS_REGISTERED,
      {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        skip: !user,
        variables: {
          eventId: event.id,
          token: user?.token,
        },
      },
    );
    const {
      data: registrationData,
      refetch: refetchRegistration,
    } = useQuery(
      GET_REGISTRATION,
      {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
          id: event.id,
          token: user?.token,
        },
        skip: !isRegisteredData?.isRegistered,
        onCompleted: (res) => {
          setIsVegan(res?.registration?.isVegan);
          setUsesBus(res?.registration?.usesBus);
        },
      },
    );
    const {
      loading: registrationsLoading,
      error: registrationsError,
      data: registrationsData,
      refetch: refetchRegistrations,
    } = useQuery(
      GET_REGISTRATIONS,
      {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
        skip: !user,
        variables: {
          eventId: event.id,
          token: user?.token,
        },
      },
    );

    const [register, { loading: registerLoading }] = useMutation(REGISTER);

    const [deleteRegistration,
      { loading: deleteLoading },
    ] = useMutation(DELTE_REGISTRATION,
      {
        variables: {
          eventId: event.id,
          token: user?.token,
        },
      });

    const [updateRegistration] = useMutation(UPDATE_REGISTRATION, {
      variables: {
        id: registrationData?.registration?.id,
        token: user?.token,
        isVegan,
        usesBus,
      },
    });

    const [metaLoading, setMetaLoading] = useState(false);

    const { toast } = useToast();

    const toggleRegistration = async () => {
      if (isRegisteredData?.isRegistered) {
        await deleteRegistration();
      } else {
        await register({
          variables: {
            eventId: event.id,
            token: user?.token,
            anotherUser: null,
          },
        }).catch((e) => {
          toast({
            variant: 'destructive',
            title: 'Villa við skráningu',
            description: e.message,
          });
        });
      }
    };

    const handleClick = async () => {
      toggleRegistration()
        .then(() => {
          refetchRegistrations();
          refetchIsRegistered();
          refetchRegistration();
        });
    };

    const handleMetaClick = async (type: 'usesBus' | 'isVegan') => {
      // e.preventDefault();
      setMetaLoading(true);
      if (type === 'usesBus') {
        await setUsesBus(!usesBus);
      }
      if (type === 'isVegan') {
        await setIsVegan(!isVegan);
      }
      await updateRegistration();
      setMetaLoading(false);
    };

      // Stýrir því hvort það sé timer eða skráning
  const renderer = ({
    days, hours, minutes, seconds, completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      const isRegistered = isRegisteredData?.isRegistered;
      const RegisterOther = dynamic(() => import('./RegisterOther'));
      const RegistrationTable = dynamic(() => import('./RegistrationTable'));
      // Check if event has passed
      const eventHasPassed = dayjs(event.date).isBefore(dayjs());
      // Render a completed state
      return (
        <>
          {/* {registerError && parseError(registerError)} */}
          {isRegisteredError && parseError(isRegisteredError)}
          <div className="flex flex-col sm:flex-row">
            <Button
              // type="submit"
              onClick={handleClick}
              disabled={
                !canRegister(user, event)
                || registerLoading
                || isRegisteredLoading
                || registrationsLoading
                || deleteLoading
                || eventHasPassed // disable button if event has passed
              }
            >
              { (registerLoading || deleteLoading || isRegisteredLoading) && <Loader2 /> }
              {eventHasPassed ? 'Lokað fyrir skráningu' : isRegistered ? 'Afskrá' : 'Skrá mig á viðburð'}
            </Button>
            {isRegistered && event.registerOthers && !canRegister(user, event) && (
              <RegisterOther
                token={user.token}
                register={
                  (anotherUser: any) => register({
                    variables:
                    { eventId: event.id, token: user?.token, anotherUser },
                  })
                }
                refetchRegistrations={refetchRegistrations}
              />
            )}
            {isRegistered && event.busAvailable && (
              <Checkbox label="Skrá í rútu" name="usesBus" onChange={() => handleMetaClick('usesBus')} value={usesBus} />
            )}
            {isRegistered && event.veganAvailable && (
            <Checkbox label="Vil vegan mat" name="isVegan" onChange={() => handleMetaClick('isVegan')} value={isVegan} />
            )}
            {isRegistered && metaLoading && (
            // <SquareLoader color="white" size="20px" css={spinnerStyles} />
            <p>Uppfæri...</p>
            )}
          </div>
          <h2 className="font-bold text-xl mt-5">Skráningar á viðburð</h2>
          {registrationsError && parseError(registrationsError)}
          <RegistrationTable
            registrations={registrationsData?.registrations}
            // loading={registrationsLoading}
            capacity={event.capacity}
          />
        </>
      );
    }
    // Render a countdown
    return (
      <p className="text-lg font-bold text-gray-50">
        {days > 0 ? `${days} ${days === 1 ? ' dagur' : ' dagar'},` : ''}
        {' '}
        {hours > 0 ? `${hours} klst.,` : ''}
        {' '}
        {minutes > 0 ? `${minutes} mín. og` : ''}
        {' '}
        {seconds}
        {' '}
        sek. í skráningu
      </p>
    );
  };

  return (
    <>
      {!canRegister(user, event) && (
        <p className="mb-3 text-red-300">Þú ert ekki virkur meðlimur og getur ekki skráð þig á þennan viðburð</p>
      )}
      <Countdown date={event.availableFrom} renderer={renderer} />
    </>
  )
}
