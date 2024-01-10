export const convertFilePathToUrl = (localFilePath: string): string => {
    // Определите базовый путь, который нужно заменить, и базовый URL
    const basePath = "C:\\inetpub\\wwwroot\\projecthelp\\files";
    const baseUrl = "http://109.248.11.164:5000/files";
  
    // Проверка, содержит ли путь указанный basePath
    if (!localFilePath.startsWith(basePath)) {
      console.error("Путь к файлу не соответствует ожидаемой базе");
      return "";
    }
  
    // Удаляем basePath и заменяем обратные слеши на обычные
    const relativePath = localFilePath.slice(basePath.length).replace(/\\/g, '/');
  
    // Создаем и возвращаем полный URL
    return baseUrl + relativePath;
}