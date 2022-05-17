/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState } from "react";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  CustomButton,
  CustomMenu,
  CustomMenuItem,
  CustomSubMenu,
  CustomTooltip,
} from ".";
// import { useLocation } from 'react-router-dom'
import CustomRow from "./CustomRow";
import { MenuOption } from "../types/general.type";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { setInitialState } from "../../actions/state/index.state";

// let history: NavigateFunction
let location: Location;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dispatch: Dispatch<any>;
const getMenuItems = (userOptions: MenuOption[], history: NavigateFunction) => {
  return userOptions.map((route: MenuOption) => {
    return route.CHILDREN && route.CHILDREN.length ? (
      <CustomSubMenu key={route.id_actividad} title={route.description}>
        {getMenuItems(route.CHILDREN, history)}
      </CustomSubMenu>
    ) : (
      <CustomMenuItem
        key={route.id_actividad}
        onClick={() => {
          if (route.route) {
            let parameters ={}
            try {
              parameters=JSON.parse(route.parameters)
            } catch (error) {
              parameters={}
            }
              dispatch(setInitialState());
              history("/" + route.route, {
                replace: true,
                state: { activityId: route.id_actividad,...parameters  },
              });
            
          }
        }}
      >
        <CustomTooltip title={route.description}>
          {route.description}
        </CustomTooltip>
      </CustomMenuItem>
    );
  });
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userMenuOptions: any[];
};

const DrawerOptions = (props: Props): ReactElement => {
  location = useLocation();
  dispatch = useDispatch();
  const history = useNavigate();
  return (
    <>
      <CustomMenu mode={"inline"} inlineIndent={10}>
        {getMenuItems(props.userMenuOptions, history)}
      </CustomMenu>
    </>
  );
};

export default DrawerOptions;
