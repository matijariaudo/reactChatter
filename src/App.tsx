import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import UserProfiles from "./pages/profile/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/instancesDashBoard/instanceDashboard";
import SetToken from "./globalVar/setToken";
import GlobalContextProvider from "./globalVar/globalVar";
import ApiTokenDashBoard from "./pages/apiKeyDashboard/apitokenDashboard";
import Documentation from "./pages/documentation/documentation";
import CheckEmail from "./pages/OtherPage/checkEmail";



export default function App() {
  return (
      <Router>
        <GlobalContextProvider>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              {/* Dashboard Layout */}
              <Route index path="app/instances" element={<Home />} />
              <Route index path="app/apikey" element={<ApiTokenDashBoard />} />
              <Route index path="app/token/:token" element={<SetToken type={true} />} />
              <Route index path="app/close" element={<SetToken type={false} />} />
              {/* Others Page */}
              <Route path="app/profile" element={<UserProfiles />} />
              {/*<Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />*/}
              {/* Forms */}
              {/*<Route path="/form-elements" element={<FormElements />} />*/}
              {/* Tables */}
              {/*<Route path="/basic-tables" element={<BasicTables />} />*/}
              {/* Ui Elements */}
              {/* <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />*/}
              {/* Charts */}
              {/*<Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
              <Route path="*" element={<Home />} />*/}
              <Route path="*" element={<Home/>} />
            </Route> 

            {/* Auth Layout */}
            <Route path="app/signin" element={<SignIn />} />
            <Route path="app/signup" element={<SignUp />} />
            <Route path="app/checkemail" element={<CheckEmail/>} />
            <Route path="app/documentation" element={<Documentation/>} />
            {/* Fallback Route            
            <Route index path="/" element={<Home/>} />*/} 
          </Routes>
          
            
        </GlobalContextProvider>
      </Router>
  );
}
