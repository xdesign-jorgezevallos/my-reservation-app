import { ref, get, push, update, remove } from 'firebase/database';

import { ReservationState, ReservationUpdated } from '../../interfaces/reservationType';
import { realtimeDB } from '../init';

export const findReservation = async (date: Date, tableName: number, hour: number) => {
  const selectedDate = new Date(date);

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

export const getAllReservations = async () => {
  const reservationsRef = ref(realtimeDB, `restaurant/reservations/`);
  const snapshot = await get(reservationsRef);
  const data = snapshot.val();
  const allReservations = [];

  for (let key in data) {
    const keyData = data[key];

    for (let key2 in keyData) {
      allReservations.push({
        id: key2,
        clientReservation: keyData[key2].clientReservation,
        reservationAmount: keyData[key2].reservationAmount,
        status: keyData[key2].status,
        reservationDate: keyData[key2].reservationDate,
        table: keyData[key2].table,
        hour: keyData[key2].hour,
        userUID: keyData[key2].userUID,
      });
    }
  }
  return allReservations;
};

export const getDateReservations = async (date: Date) => {
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
  const reservationDateString =
    `${data.reservationDate?.getFullYear()}-${data.reservationDate?.getMonth()}-${data.reservationDate?.getDate()}` ||
    `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;

  const refResponse = await push(ref(realtimeDB, `restaurant/reservations/${reservationDateString}`), {
    ...data,
    reserved: new Date().getTime(),
    reservationDate: reservationDateString,
  });

  if (refResponse != null) {
    return { id: refResponse.key, ...data };
  }
  return refResponse;
};

export const updateReservation = async (reservationUID: string, data: ReservationUpdated) => {
  try {
    const reservationDate = new Date(`${data.reservationDate}`);

    if (!reservationDate) return;

    const reservationDateString = `${reservationDate?.getFullYear()}-${
      reservationDate.getMonth() + 1
    }-${reservationDate?.getDate()}`;

    await update(ref(realtimeDB, `restaurant/reservations/${reservationDateString}/${reservationUID}`), data);

    return data;
  } catch (error) {
    console.log('Error on update: ', error);
    return null;
  }
};

export const deleteReservation = async (reservationUID: string, data: ReservationState) => {
  const reservationDate = new Date(`${data.reservationDate}`);
  const reservationDateString = `${reservationDate.getFullYear()}-${
    reservationDate.getMonth() + 1
  }-${reservationDate.getDate()}`;

  const refResponse = await remove(
    ref(realtimeDB, `restaurant/reservations/${reservationDateString}/${reservationUID}`)
  );
  console.log('Delete refResponse: ', refResponse);
  return {
    id: reservationUID,
    ...data,
  };
};
