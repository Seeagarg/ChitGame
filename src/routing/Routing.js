import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import IntroPage from "../pages/IntroPage";
import { AnimatePresence, motion } from "framer-motion";
import InstructionsPage from "../pages/InstructionsPage";
import TermsPage from "../pages/TermsPage";
import AccountPage from "../pages/AccountPage";
import GamePage from "../pages/GamePage";
import LoginPage from "../pages/LoginPage";
import GameOver from "../pages/GameOver";

const Routing = () => {
  const routes = [
    {
      path: "/home",
      element: <HomePage/>,
    },
    {
      path: "/",
      element: <IntroPage />,
    },
    {
      path: "/instructions",
      element: <InstructionsPage/>,
    },
    {
      path: "/terms",
      element: <TermsPage />,
    },
    {
      path: "/account",
      element: <AccountPage />,
    },
    {
      path: "/game",
      element: <GamePage />,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/gameOver",
      element: <GameOver/>,
    },
  ];

  const element = useRoutes(routes);

  // console.log(element,'element');

  const location = useLocation();

  if (!element) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {element}
      <motion.div
        initial={{ scaleX: 1 }}
        key={location.pathname}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: 1 }}
        className="privacy-screen"
      />
    </AnimatePresence>
  );
};

export default Routing;
