export type QRDataType = 'text' | 'url' | 'wifi' | 'email' | 'sms' | 'phone' | 'vcard' | 'calendar' | 'geo';

export interface WiFiData {
  ssid: string;
  password: string;
  security: 'WEP' | 'WPA' | 'WPA2' | 'nopass';
  hidden: boolean;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CalendarData {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export interface GeoData {
  latitude: number;
  longitude: number;
}

export interface QROptions {
  size: number;
  bgColor: string;
  fgColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export type QRData = 
  | { type: 'text'; text: string }
  | { type: 'url'; url: string }
  | { type: 'wifi'; data: WiFiData }
  | { type: 'email'; data: EmailData }
  | { type: 'sms'; data: SMSData }
  | { type: 'phone'; phone: string }
  | { type: 'vcard'; data: VCardData }
  | { type: 'calendar'; data: CalendarData }
  | { type: 'geo'; data: GeoData };