import { lazy, Suspense, useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import GlobalLoader from "./components/loader/Loader";
import { socket, socketEvent } from "./constants/constants";
import ForgetPassword from "./pages/auth/forget-password/ForgetPassword";
import Otp from "./pages/auth/otp/Otp";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import Dashboard from "./pages/dashboard";
import { getDeviceDataAction } from "./redux/actions/device.actions";

const Login = lazy(() => import("./pages/auth/login"));
const Home = lazy(() => import("./pages/dashboard/Home/Home"));
const TruckReport = lazy(() => import("./pages/dashboard/report/truckreport/TruckReport"));
const DailyOperations = lazy(() => import("./pages/dashboard/report/operations/DailyOperations"));
const SOS = lazy(() => import("./pages/dashboard/report/sos/SOS"));
const VideoEvidence = lazy(() => import("./pages/dashboard/report/video/VideoEvidence"));
const AlertType = lazy(() => import("./pages/dashboard/settings/alert/AlertType"));
const Drivers = lazy(() => import("./pages/dashboard/settings/drivers/Drivers"));
const Trucks = lazy(() => import("./pages/dashboard/settings/trucks/Trucks"));
const Devices = lazy(() => import("./pages/dashboard/settings/devices/Devices"));
const Employees = lazy(() => import("./pages/dashboard/settings/employees/Employees"));
const GeoFence = lazy(() => import("./pages/dashboard/dashboardPages/geofence/GeoFence"));
const RealTimeMap = lazy(() => import("./pages/dashboard/dashboardPages/RealTimeMap/RealTimeMap"));
const SubscriptionPlan = lazy(() => import("./pages/dashboard/plans/subscriptionPlan/SubscriptionPlan"));
const SubscriptionHistory = lazy(
    () => import("./pages/dashboard/plans/subscriptionHistory/SubscriptionHistory")
);
const TruckDetail = lazy(() => import("./pages/dashboard/settings/trucks/components/TruckDetail"));
const Notification = lazy(() => import("./pages/dashboard/navigation/header/components/NotificationDetail"));

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });
        socket.on(socketEvent.SENSORS_DATA, (data) => {
            console.log("trucks data coming from server ", data);
            dispatch(getDeviceDataAction(data));
        });
    }, [dispatch]);

    const loader = <GlobalLoader />;
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={loader}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route path="/verify-otp" element={<Otp />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password/:reset-token" element={<ResetPassword />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route
                    path="/dashboard"
                    element={
                        // <ProtectedRoute>
                        <Suspense fallback={loader}>
                            <Dashboard />
                        </Suspense>
                        // </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate replace to="home" />} />
                    <Route
                        path="home"
                        element={
                            <Suspense fallback={loader}>
                                <Home />
                            </Suspense>
                        }
                    />
                    <Route
                        path="reports/truck-report"
                        element={
                            <Suspense fallback={loader}>
                                <TruckReport />
                            </Suspense>
                        }
                    />
                    <Route
                        path="reports/operations"
                        element={
                            <Suspense fallback={loader}>
                                <DailyOperations />
                            </Suspense>
                        }
                    />
                    <Route
                        path="reports/sos"
                        element={
                            <Suspense fallback={loader}>
                                <SOS />
                            </Suspense>
                        }
                    />
                    <Route
                        path="reports/video"
                        element={
                            <Suspense fallback={loader}>
                                <VideoEvidence />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/alert"
                        element={
                            <Suspense fallback={loader}>
                                <AlertType />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/drivers"
                        element={
                            <Suspense fallback={loader}>
                                <Drivers />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/trucks"
                        element={
                            <Suspense fallback={loader}>
                                <Trucks />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/devices"
                        element={
                            <Suspense fallback={loader}>
                                <Devices />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/employees"
                        element={
                            <Suspense fallback={loader}>
                                <Employees />
                            </Suspense>
                        }
                    />
                    <Route
                        path="real-time-map"
                        element={
                            <Suspense fallback={loader}>
                                <RealTimeMap />
                            </Suspense>
                        }
                    />
                    <Route
                        path="geofence"
                        element={
                            <Suspense fallback={loader}>
                                <GeoFence />
                            </Suspense>
                        }
                    />
                    <Route
                        path="plans/subscription-plan"
                        element={
                            <Suspense fallback={loader}>
                                <SubscriptionPlan />
                            </Suspense>
                        }
                    />
                    <Route
                        path="plans/subscription-history"
                        element={
                            <Suspense fallback={loader}>
                                <SubscriptionHistory />
                            </Suspense>
                        }
                    />
                    <Route
                        path="truck-detail/:truckId"
                        element={
                            <Suspense fallback={loader}>
                                <TruckDetail />
                            </Suspense>
                        }
                    />
                    <Route
                        path="notification"
                        element={
                            <Suspense fallback={loader}>
                                {" "}
                                <Notification />{" "}
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
