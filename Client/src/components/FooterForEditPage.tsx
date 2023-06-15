import { Box, Button } from "@mui/material";

export default function FooterForEditPage() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'fixed', minHeight: '5vh', minWidth: '100vw', background: '#CCC', bottom: 0, left: 0, p: 1, pr: 20 }}>
            <Button variant="contained">
                Сохранить
            </Button>
            <Button variant="contained" sx={{ ml: 2 }}>
                Вернуться к просмотру
            </Button>
        </Box>
    )
}
