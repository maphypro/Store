import { Container } from "@mui/material";
import FooterForEditPage from "../../components/FooterForEditPage";
import SyllabusEdit from "../../components/SyllabusEdit";

export default function EditSyllabus() {
  return (
    <Container sx={{w:1, pb: 10}}>
        <SyllabusEdit />
        <FooterForEditPage />
    </Container>
  )
}
