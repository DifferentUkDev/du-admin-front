export const status = (stat: number | undefined) => {
    if (stat === 0) return 'Новая';
    else if (stat === 1) return 'Принята';
    else if (stat === 2) return 'Отклонена';
    else if (stat === 3) return 'Исправлена';
}

export const colorBadge = (stat: number | undefined) => {
    if (stat === 0) return 'purple';
    else if (stat === 1) return 'green';
    else if (stat === 2) return 'red';
    else if (stat === 3) return 'green';
}