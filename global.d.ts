// Добавляем в тип window функцию для капчи
interface Window {
  handleRecaptchaSuccess?: (token: string) => void
}
