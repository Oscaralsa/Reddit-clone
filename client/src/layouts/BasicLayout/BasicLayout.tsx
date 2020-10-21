import React from "react";

import NavBar from "../../components/NavBar";

export default function BasicLayout(props: {children: JSX.Element}) {

  const { children } = props;
  return(
    <div className="basic-layout" >
      <NavBar />
      <h1>Este es el layout</h1>
      {children}
    </ div>
  )
}