import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#FFFFFF', // Цвет фона по умолчанию
            paper: '#FFFFFF',   // Цвет фона бумажной поверхности (например, карточек)
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 16,
        // другие настройки шрифтов, размеров и т.д.
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: 0, // Remove default padding
                    margin: 0, // Optionally remove default margin
                  },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                dense: {
                    height: 50,
                    minHeight: 32
                }
            }
          },
    },
});