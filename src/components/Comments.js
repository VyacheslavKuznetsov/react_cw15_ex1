import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { GITHUB_LOGIN, GITHUB_PROJECT, GITHUB_TOKEN } from "../constants";
import { GithubApi } from "./GithubApi";

const userHRefClick = (e) => {
  e.preventDefault();
  window.open(e.target.href, "_blank");
};

const userTemplate = (rowData) => {
  return (
    <a onClick={userHRefClick} href={rowData.userUrl}>
      {rowData.userLogin}
    </a>
  );
};

const Comments = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const github = new GithubApi(GITHUB_LOGIN, GITHUB_TOKEN, GITHUB_PROJECT);
    if (props.location.state == null) {
      return;
    }
    github.getComments(props.location.state.url).then((issues) => {
      console.log(issues);
      setData(issues);
    });
  }, []);

  return (
    <>
      <NavLink to="/issues">
        <Button icon="pi pi-chevron-left" />
      </NavLink>
      <DataTable value={data} removableSort>
        <Column
          field="createdDate"
          header="Дата создания"
          style={{ width: "7%" }}
          sortable
        />
        <Column
          field="userLogin"
          header="Пользователь"
          style={{ width: "10%" }}
          body={userTemplate}
          sortable
        />
        <Column
          field="body"
          header="Комментарий"
          style={{ width: "50%" }}
          sortable
        />
      </DataTable>
    </>
  );
};

export default withRouter(Comments);
