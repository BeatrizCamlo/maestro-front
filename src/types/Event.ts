export type Event = {
  name?: string; 
  title: string;
  dateTime: string; 
  location: string;
  description?: string;
};

export type EventWithId = Event & { id: number };