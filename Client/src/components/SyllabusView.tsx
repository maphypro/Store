import { Box, List, ListItem } from "@mui/material";
import SyllabusViewModule from "./SyllabusViewModule";
import SyllabusViewLesson from "./SyllabusViewLesson";

const ModuleStyle = {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '0px'
}

const LessonStyle = {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '64px'
}


export default function SyllabusView() {

    

    return (
        <Box >
            <List sx={{
                border: '1px solid red',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '200px'
            }}>
                <ListItem sx={ModuleStyle}>
                    <SyllabusViewModule />
                    <List>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem sx={ModuleStyle}>
                    <SyllabusViewModule />
                    <List>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem sx={ModuleStyle}>
                    <SyllabusViewModule />
                    <List>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem sx={ModuleStyle}>
                    <SyllabusViewModule />
                    <List>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem sx={ModuleStyle}>
                    <SyllabusViewModule />
                    <List>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                        <ListItem sx={LessonStyle}>
                            <SyllabusViewLesson />
                        </ListItem>
                    </List>
                </ListItem>
            </List>
        </Box>
    )
}
