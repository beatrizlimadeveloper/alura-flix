import { ThemeProvider, createTheme } from "@mui/material";
import styles from "./DefaultPage.module.css";
import Footer from "components/Footer";
import Header from "components/Header";
import { DashboardProvider } from "contexts/DashboardConfigContext";
import { Outlet } from "react-router-dom";
import { VideoEditProvider } from "contexts/VideoEditContext";
import { ModalFormProvider } from "contexts/ModalFormContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function DefaultPage() {
  return (
    <div className={styles.flex}>
      <div className={styles.flexContent}>
        <ThemeProvider theme={darkTheme}>
          <DashboardProvider>
            <VideoEditProvider>
              <ModalFormProvider>
                <Header />
                <Outlet />
              </ModalFormProvider>
            </VideoEditProvider>
          </DashboardProvider>
        </ThemeProvider>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultPage;
