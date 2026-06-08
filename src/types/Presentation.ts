import { User } from "./User";


export interface Group {
  id: string | number;
  name: string;
  coordinatorId: string | number;
  coordinator?: User; 
}


export interface Event {
  id: string | number;
  name: string;
  date?: string;       
  location?: string;   
}

export type SolicitationStatus = "PENDING" | "CONFIRMED" | "CANCELED";


export interface Presentation {
  id: string | number;
  groupId: string | number;
  groupName?: string;     
  eventId: string | number;
  eventName?: string;     
  time: string;           
  status: SolicitationStatus;
  cancelReason?: string;  
}