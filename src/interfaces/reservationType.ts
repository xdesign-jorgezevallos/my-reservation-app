export interface ReservationState {
  id?: string;
  userUID?: string;
  userEmail?: string;
  displayname?: string;
  clientReservation: string;
  reservationAmount: number;
  status: boolean;
  reservationDate?: Date;
  table: number;
  hour: number;
}

export interface ReservationUpdated {
  id: string;
  status: boolean;
  clientReservation: string;
  reservationAmount: number;
  reservationDate: Date;
  table: number;
  hour: number;
}

export interface ReservationResponse {
  status: boolean;
  message: string;
}

export interface Reservation {
  reservations: ReservationState[];
  reservationExist: ReservationResponse;
  savedReservation: boolean;
  selectedReservation: ReservationUpdated | undefined;
  showUpdateReservationDialog: boolean;
}
