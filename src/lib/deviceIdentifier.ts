import { v4 } from 'uuid';

const DEVICE_ID_KEY = 'supplysmart_device_id';

export function getDeviceIdentifier(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  
  if (!deviceId) {
    deviceId = v4();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  
  return deviceId;
}