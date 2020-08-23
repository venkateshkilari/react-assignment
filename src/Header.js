import React, { useContext } from "react";
import { Store } from "./store";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

export default function () {
  const { state, dispatch } = useContext(Store);

  const logoutUser = () => {
    dispatch({ type: "user", payload: {} });
    window.location.reload();
  };

  return (
    <React.Fragment>
      {state && state.user && state.user.token && (
        <div className="header">
          <div className="row">
            <div className="col-lg-12">
              <Card>
                <CardContent>
                  <span className="header-logout">
                    <IconButton onClick={logoutUser}>
                      <PowerSettingsNewIcon />
                    </IconButton>
                  </span>
                  <span className="header-user-name">
                    <Icon>
                      <AccountCircleIcon />
                    </Icon>
                    <span className="header-user-name-text">
                      {state.user.firstName}
                    </span>{" "}
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
