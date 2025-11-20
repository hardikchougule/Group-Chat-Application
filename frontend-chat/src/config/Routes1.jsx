import { Route, Routes } from "react-router";
import App from "../App";
import ChatPage from "../components/ChatPage";

function Routes1(){
    return(
        <>
         <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path="*" element={<h1>Page Not Found</h1>}/>
         </Routes>
        </>
    )
}

export default Routes1;