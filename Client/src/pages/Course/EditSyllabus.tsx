import { Container } from "@mui/material";
import FooterForEditPage from "../../components/FooterForEditPage";
import SyllabusEdit from "../../components/SyllabusEdit";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect } from "react";
import { initializeModulesForExchange } from "../../store/Course/courseSlice";

export default function EditSyllabus() {


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeModulesForExchange());
    console.log('EditSyllabus')
  }, [])

  return (
    <Container sx={{w:1, pb: 10}}>
        <SyllabusEdit />
        <FooterForEditPage />
    </Container>
  )
}
