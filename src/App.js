import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./utils/routes";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Footer from "./components/Footer";

const App = () => {
  const accountDetails = useSelector((state) => state.accountDetails);
  const [acDetails, setacDetails] = useState("");

  useEffect(() => {
    setacDetails(accountDetails);
  }, [accountDetails]);

  return (
    <div className="App">
      <ReactNotification isMobile="true" />
      <Router>
        <Header acDetails={acDetails} />
        <Switch>
          {routes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              exact={route.exact}
              component={route.components}
            />
          ))}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
