import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.vividvcard',
  appName: 'vivid-vcard',
  webDir: 'dist',
  server: {
    url: 'https://6d14937d-26d7-48f2-a5e8-3766fa05959c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
