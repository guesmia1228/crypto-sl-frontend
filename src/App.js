import Footer from "./components/footer/footer";
import "./style/general.css";
import Navigation from "./components/navigation/navigation";
import setCookies from "./components/setCookie/setCookie";
import DashboardLayout from "./dashboard/dashboardLayout/dashboardLayout";
import React, { useEffect, useState, Suspense } from "react";
import {
  Route,
  HashRouter,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import CookieBanner from "./components/cookieBanner/cookieBanner";
import Cookies from "js-cookie";
import { MessageContextProvider } from "./context/message";
import RingLoader from "react-spinners/RingLoader";

const Contact = React.lazy(() => import("./components/contact/contact"));
const Home = React.lazy(() => import("./pages/Home"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const Layout = React.lazy(() => import("./pages/Layout"));
const Login = React.lazy(() => import("./pages/Login"));
const Payment = React.lazy(() => import("./pages/Payment"));
const Affiliate = React.lazy(() => import("./pages/Affiliate"));
const Support = React.lazy(() => import("./pages/Support"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Imprint = React.lazy(() => import("./pages/Imprint"));
const PasswordForgot = React.lazy(() => import("./pages/PasswordForgot"));
const Product = React.lazy(() => import("./pages/Product"));
const Pay = React.lazy(() => import("./pages/Pay"));
const AffiliateDashboard = React.lazy(() => import("./dashboard/Affiliate"));
const Settings = React.lazy(() => import("./dashboard/Settings"));
const Vendor = React.lazy(() => import("./dashboard/Vendor"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const Products = React.lazy(() => import("./dashboard/Products"));
const Transactions = React.lazy(() => import("./dashboard/Transactions"));
const PaymentDashboard = React.lazy(() => import("./dashboard/Payment"));
const PayrollDashboard = React.lazy(() => import("./dashboard/Payroll"));
const Wallet = React.lazy(() => import("./dashboard/Wallet"));
const Admin = React.lazy(() => import("./dashboard/Admin"));
const Kyc = React.lazy(() => import("./dashboard/Kyc"));

import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "./assets/logo/loadingAnimation.json";

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
      <MessageContextProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="loadingAnimationWrapper">
                <Player
                  src={LoadingAnimation}
                  className="loadingAnimation"
                  loop
                  autoplay
                />
              </div>
            }
          >
            {() => {
              setTimeout(() => {
                "Test";
              }, 1000000);
            }}
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
                        <Products />
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
                    path="/dashboard/seniorbroker"
                    element={
                      <>
                        <Admin type={"seniorbroker"} />
                      </>
                    }
                  />

                  <Route
                    path="/dashboard/broker"
                    element={
                      <>
                        <Admin type={"broker"} />
                      </>
                    }
                  />

                  <Route
                    path="/dashboard/leader"
                    element={
                      <>
                        <Admin type={"leader"} />
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
                <Route
                  path="/product/:productLink"
                  element={
                    <>
                      <Navigation />

                      <Product />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/pay/:payLink"
                  element={
                    <>
                      <Navigation />

                      <Pay />
                      <Footer />
                    </>
                  }
                />

                <Route
                  path="/dashboardNew/"
                  element={
                    <ScreenLayout>
                      <MainDashboard />
                    </ScreenLayout>
                  }
                />

                <Route
                  path="/dashboardNew/profile"
                  element={
                    <ScreenLayout>
                      <ProfileDashboard />
                    </ScreenLayout>
                  }
                />
                <Route
                  path="/dashboardNew/security"
                  element={
                    <ScreenLayout>
                      <SecuritySettings />
                    </ScreenLayout>
                  }
                />
              </Routes>
            </ScrollToTop>
          </Suspense>

          {/* COOKIE BANNER */}
          {!ck && <CookieBanner close={() => setCK(true)} />}
        </BrowserRouter>
      </MessageContextProvider>
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
