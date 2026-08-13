import DeviceInfo from 'react-native-device-info';

export const getDeviceId = async (): Promise<string> => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();
    console.log('Device ID:', deviceId);
    return deviceId || 'unknown-device-id';
  } catch (error) {
    console.error('Error getting device ID:', error);
    return 'unknown-device-id';
  }
};
