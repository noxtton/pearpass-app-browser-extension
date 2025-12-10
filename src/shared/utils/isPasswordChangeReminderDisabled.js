import { LOCAL_STORAGE_KEYS } from '../constants/storage'

export const isPasswordChangeReminderDisabled = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.PASSWORD_CHANGE_REMINDER_ENABLED) ===
  'false'
