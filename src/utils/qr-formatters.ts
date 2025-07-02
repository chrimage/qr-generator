import type { QRData } from '../types/qr-types';

export function formatQRData(data: QRData): string {
  switch (data.type) {
    case 'text':
      return data.text;
    
    case 'url':
      return data.url.startsWith('http') ? data.url : `https://${data.url}`;
    
    case 'wifi':
      return `WIFI:T:${data.data.security};S:${data.data.ssid};P:${data.data.password};H:${data.data.hidden ? 'true' : 'false'};;`;
    
    case 'email':
      const { email, subject, body } = data.data;
      return `mailto:${email}${subject || body ? '?' : ''}${subject ? `subject=${encodeURIComponent(subject)}` : ''}${subject && body ? '&' : ''}${body ? `body=${encodeURIComponent(body)}` : ''}`;
    
    case 'sms':
      return `sms:${data.data.phone}${data.data.message ? `?body=${encodeURIComponent(data.data.message)}` : ''}`;
    
    case 'phone':
      return `tel:${data.phone}`;
    
    case 'vcard':
      const vcard = data.data;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${vcard.lastName};${vcard.firstName};;;`,
        `FN:${vcard.firstName} ${vcard.lastName}`,
        vcard.organization && `ORG:${vcard.organization}`,
        vcard.title && `TITLE:${vcard.title}`,
        vcard.phone && `TEL:${vcard.phone}`,
        vcard.email && `EMAIL:${vcard.email}`,
        vcard.website && `URL:${vcard.website}`,
        (vcard.address || vcard.city || vcard.state || vcard.zip || vcard.country) && 
          `ADR:;;${vcard.address};${vcard.city};${vcard.state};${vcard.zip};${vcard.country}`,
        'END:VCARD'
      ].filter(Boolean).join('\n');
    
    case 'calendar':
      const cal = data.data;
      const startDateTime = `${cal.startDate.replace(/-/g, '')}T${cal.startTime.replace(/:/g, '')}00`;
      const endDateTime = `${cal.endDate.replace(/-/g, '')}T${cal.endTime.replace(/:/g, '')}00`;
      return [
        'BEGIN:VEVENT',
        `SUMMARY:${cal.title}`,
        cal.description && `DESCRIPTION:${cal.description}`,
        cal.location && `LOCATION:${cal.location}`,
        `DTSTART:${startDateTime}`,
        `DTEND:${endDateTime}`,
        'END:VEVENT'
      ].filter(Boolean).join('\n');
    
    case 'geo':
      return `geo:${data.data.latitude},${data.data.longitude}`;
    
    default:
      return '';
  }
}