export const dateConvert = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
};