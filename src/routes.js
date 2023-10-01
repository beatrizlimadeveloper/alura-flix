import Dashboard from "pages/Dashboard";
import ManageVideos from "pages/Dashboard/ManageVideos";
import DefaultPage from "pages/DefaultPage";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes(){
  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={DefaultPage}>
            <Route index Component={Home}/>
            <Route path="dashboard" Component={Dashboard}/>
            <Route path="dashboard-videos" Component={ManageVideos}/>
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default AppRoutes;