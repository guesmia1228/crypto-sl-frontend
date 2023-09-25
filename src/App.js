import Contact from "./components/contact/contact";
import Footer from "./components/footer/footer";
import Home from "./pages/Home";
import "./style/general.css";
import Navigation from "./components/navigation/navigation";
import setCookies from "./components/setCookie/setCookie";
import {
  Route,
  HashRouter,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import SignUp from "./pages/Signup";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Affiliate from "./pages/Affiliate";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Imprint from "./pages/Imprint";
import PasswordForgot from "./pages/PasswordForgot";
import { useEffect, useState } from "react";
import AffiliateDashboard from "./dashboard/Affiliate";
import Settings from "./dashboard/Settings";
import Vendor from "./dashboard/Vendor";
import ResetPassword from "./pages/ResetPassword";
import Product from "./dashboard/Product";
import DashboardLayout from "./dashboard/dashboardLayout/dashboardLayout";
import Transactions from "./dashboard/Transactions";
import PaymentDashboard from "./dashboard/Payment";
import PayrollDashboard from "./dashboard/Payroll";
import Wallet from "./dashboard/Wallet";
import Admin from "./dashboard/Admin";
import Kyc from "./dashboard/Kyc";
import CookieBanner from "./components/cookieBanner/cookieBanner";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    const scrollEvent = () => {
      const scrollElement = document.querySelectorAll(".scroll");
      const slideElement = document.querySelectorAll(".slide-left");
      const slideElement2 = document.querySelectorAll(".slide-right");

      const addClass = (element, className) => {
        for (let i = 0; i < element.length; i++) {
          const sectionTop = element[i].offsetTop;

          const scrollPosition = window.scrollY;

          if (scrollPosition + window.innerHeight * 0.6 >= sectionTop) {
            element[i].classList.add(className);
          }
        }
      };

      addClass(scrollElement, "scrollAnimation");
      addClass(slideElement, "slideAnimation");
      addClass(slideElement2, "slideAnimation");
    };

    window.addEventListener("scroll", scrollEvent);

    document.addEventListener("contextmenu", (event) => {
      // event.preventDefault();
    });

    return () => {
      window.removeEventListener("scroll", () => scrollEvent);
    };
  }, []);

  const [ck, setCK] = useState(Cookies.get("acceptCookie"));

  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/forgot-password"
              element={
                <>
                  <PasswordForgot />
                </>
              }
            />
            <Route
              path="/reset-password"
              element={
                <>
                  <ResetPassword />
                </>
              }
            />

            <Route
              path="/payment"
              element={
                <>
                  <Navigation />

                  <Payment />
                  <Footer />
                </>
              }
            />
            {/* <Route
              path="/payroll"
              element={
                <Layout>
                  <Payroll />
                </Layout>
              }
            /> */}
            <Route
              path="/affiliate"
              element={
                <Layout affiliate={true}>
                  <Affiliate />
                </Layout>
              }
            />
            <Route
              path="/support"
              element={
                <>
                  <Navigation />

                  <Support />
                  <Footer />
                </>
              }
            />
            <Route
              path="/privacy"
              element={
                <>
                  <Navigation />
                  <Privacy />
                  <Footer />
                </>
              }
            />
            <Route
              path="/imprint"
              element={
                <>
                  <Navigation />
                  <Imprint />
                  <Footer />
                </>
              }
            />
            <Route path="/dashboard">
              <Route
                path="/dashboard/affiliate"
                element={
                  <>
                    <AffiliateDashboard />
                  </>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <>
                    <Settings />
                  </>
                }
              />
              <Route
                path="/dashboard/vendor"
                element={
                  <DashboardLayout>
                    <Vendor />
                  </DashboardLayout>
                }
              />

              <Route
                path="/dashboard/product"
                element={
                  <DashboardLayout>
                    <Product />
                  </DashboardLayout>
                }
              />

              <Route
                path="/dashboard/transactions"
                element={
                  <DashboardLayout>
                    <Transactions />
                  </DashboardLayout>
                }
              />

              <Route
                path="/dashboard/payment"
                element={
                  <DashboardLayout>
                    <PaymentDashboard />
                  </DashboardLayout>
                }
              />

              <Route
                path="/dashboard/payroll"
                element={
                  <DashboardLayout>
                    <PayrollDashboard />
                  </DashboardLayout>
                }
              />

              <Route
                path="/dashboard/wallet"
                element={
                  <DashboardLayout>
                    <Wallet />
                  </DashboardLayout>
                }
              />

              <Route
                path="/dashboard/admin"
                element={
                  <>
                    <Admin type={"admin"} />
                  </>
                }
              />

              <Route
                path="/dashboard/diamond"
                element={
                  <>
                    <Admin type={"diamond"} />
                  </>
                }
              />

              <Route
                path="/dashboard/gold"
                element={
                  <>
                    <Admin type={"gold"} />
                  </>
                }
              />

              <Route
                path="/dashboard/ib-leader"
                element={
                  <>
                    <Admin type={"ib_leader"} />
                  </>
                }
              />

              <Route
                path="/dashboard/kyc"
                element={
                  <>
                    <Kyc />
                  </>
                }
              />

              <Route
                path="/dashboard/vendor/settings"
                element={
                  <DashboardLayout>
                    <Settings type="vendor" />
                  </DashboardLayout>
                }
              />
            </Route>
          </Routes>
        </ScrollToTop>

        {/* COOKIE BANNER */}
        {!ck && <CookieBanner close={() => setCK(true)} />}
      </HashRouter>
    </div>
  );
}

export default App;

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};
