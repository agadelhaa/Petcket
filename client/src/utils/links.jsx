import React from "react";
import { ImProfile } from "react-icons/im"; //profile
import { FaPlusCircle } from "react-icons/fa"; //add-purchase
import { FaChartBar } from "react-icons/fa"; //stats
import { FaListUl } from "react-icons/fa"; //all-purchases
import { MdAdminPanelSettings } from "react-icons/md"; // admin

const links = [
  { text: "estatísticas", path: ".", icon: <FaChartBar /> },
  { text: "registrar compra", path: "add-purchase", icon: <FaPlusCircle /> },
  {
    text: "histórico registros",
    path: "all-purchases",
    icon: <FaListUl />,
  },
  { text: "perfil", path: "profile", icon: <ImProfile /> },
  // { text: "admin", path: "admin", icon: <MdAdminPanelSettings /> },
];

export default links;
