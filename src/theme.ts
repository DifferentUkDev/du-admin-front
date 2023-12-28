import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: 'Roboto, sans-serif',
        body: 'Roboto, sans-serif',
    },
    textStyles: {
        h1: {
            fontSize: ['48px', '72px'], // Пример для мобильных и десктопов
            fontWeight: 'bold',
            lineHeight: '110%',
            letterSpacing: '-2%',
        },
        h2: {
            fontSize: ['36px', '48px'],
            fontWeight: 'semibold',
            lineHeight: '110%',
            letterSpacing: '-1%',
        },
        h3: {
            fontSize: ['28px', '36px'],
            fontWeight: 'semibold',
            lineHeight: '110%',
            letterSpacing: '-1%',
        },
        h4: {
            fontSize: ['22px', '28px'],
            fontWeight: 'semibold',
            lineHeight: '110%',
            letterSpacing: '-1%',
        },
        h5: {
            fontSize: ['20px', '26px'],
            fontWeight: 'semibold',
            lineHeight: '110%',
            letterSpacing: '-1%',
        },
        p: {
            fontSize: ['14px', '18px'],
            fontWeight: 'regular',
            lineHeight: '110%',
            letterSpacing: '-1%',
        }
    },
    colors: {
        primary: {
            50: '#e3f2fd', // светлый оттенок для фонов или акцентов
            100: '#bbdefb', // для фона карточек или панелей
            200: '#90caf9', // для элементов формы
            300: '#64b5f6', // для активных элементов или кнопок
            400: '#42a5f5', // для заголовков или акцентного текста
            500: '#2196f3', // основной цвет для интерактивных элементов
            600: '#1e88e5', // темный цвет для акцентов или важного текста
            700: '#1976d2', // очень темный для акцентов или фона
            800: '#1565c0', // почти черный для фона или текста
            900: '#0d47a1', // черный или очень темный цвет
          },
          accent: {
            50: '#fff3e0',
            100: '#ffe0b2',
            200: '#ffcc80',
            300: '#ffb74d',
            400: '#ffa726',
            500: '#ff9800',
            600: '#fb8c00',
            700: '#f57c00',
            800: '#ef6c00',
            900: '#e65100',
          },
    },
    styles: {
        global: {
            body: {
                margin: 0,
                padding: 0,
                overflowX: 'hidden', // Убирает горизонтальный скролл
                maxHeight: '100vh',
            },
        },
    },
});

export default theme;
