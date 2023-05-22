import { ref, get, push, update, remove } from 'firebase/database';

import { ReservationState } from '../../interfaces/reservationType';
import { realtimeDB } from '../init';

export const findReservation = async (date: Date, tableName: number, hour: number) => {
  const selectedDate = new Date(date);
  console.log('>>> findReservation: ', selectedDate.getMonth());
  const reservationRef = ref(
    realtimeDB,
    `restaurant/reservations/${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`
  );
  const snapshot = await get(reservationRef);
  const data = snapshot.val();
  let reservationExist: boolean = false;

  for (let key in data) {
    if (data[key].table === tableName && data[key].hour === hour) {
      reservationExist = true;
    }
  }
  return reservationExist;
};

export const getDateReservations = async (date: Date) => {
  console.log('>>> getDateReservations: ', date.getMonth());
  const selectedDate = new Date(date);
  const reservationRef = ref(
    realtimeDB,
    `restaurant/reservations/${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`
  );
  const snapshot = await get(reservationRef);
  const data = snapshot.val();
  let reservationList = [];

  for (let key in data) {
    reservationList.push({
      id: key,
      clientReservation: data[key].clientReservation,
      reservationAmount: data[key].reservationAmount,
      status: data[key].status,
      reservationDate: data[key].reservationDate,
      table: data[key].table,
      hour: data[key].hour,
      userUID: data[key].userUID,
    });
  }
  return reservationList;
};

export const getDateReservationsByUser = async (date: Date, uid: string) => {
  const selectedDate = new Date(date);
  const reservationRef = ref(
    realtimeDB,
    `restaurant/reservations/${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
  );
  const snapshot = await get(reservationRef);
  const data = snapshot.val();

  let reservationList = [];
  for (let key in data) {
    if (data[key].userUID === uid) {
      reservationList.push({
        id: key,
        clientReservation: data[key].clientReservation,
        reservationAmount: data[key].reservationAmount,
        status: data[key].status,
        reservationDate: data[key].reservationDate,
        table: data[key].table,
        hour: data[key].hour,
        userUID: data[key].userUID,
      });
    }
  }
  return reservationList;
};

export const saveReservation = async (data: ReservationState) => {
  const rDate =
    `${data.reservationDate?.getFullYear()}-${data.reservationDate?.getMonth()}-${data.reservationDate?.getDate()}` ||
    `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;

  const refResponse = await push(ref(realtimeDB, `restaurant/reservations/${rDate}`), {
    ...data,
    reserved: new Date().getTime(),
    reservationDate: rDate,
  });

  if (refResponse != null) {
    return { id: refResponse.key, ...data };
  }
  return refResponse;
};

export const updateReservation = async (reservationUID: string, data: ReservationState) => {
  const rDate = `${data.reservationDate?.getFullYear()}-${data.reservationDate?.getMonth()}-${data.reservationDate?.getDate()}`;

  const refResponse = await update(ref(realtimeDB, `restaurant/reservations/${rDate}/${reservationUID}`), data);
  if (refResponse != null) {
    return data;
  }
  return refResponse;
};

export const deleteReservation = async (reservationUID: string, data: ReservationState) => {
  const reservationDate = new Date(`${data.reservationDate}`);
  const rDate = `${reservationDate.getFullYear()}-${reservationDate.getMonth() + 1}-${reservationDate.getDate()}`;

  const refResponse = await remove(ref(realtimeDB, `restaurant/reservations/${rDate}/${reservationUID}`));
  return {
    id: reservationUID,
    ...data,
  };
};
