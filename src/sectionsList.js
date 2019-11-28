import { ReactComponent as Home } from "./Icons/home.svg";
import { ReactComponent as Project } from "./Icons/project.svg";
import { ReactComponent as Payment } from "./Icons/payment.svg";
import { ReactComponent as Report } from "./Icons/report.svg";
import { ReactComponent as Expense } from "./Icons/expense.svg";
import { ReactComponent as Client } from "./Icons/client.svg";
import { ReactComponent as Supplier } from "./Icons/supplier.svg";
import { ReactComponent as WorkLoad } from "./Icons/workload.svg";
import { ReactComponent as Setting } from "./Icons/setting.svg";

export default [
  {
    text: "Home",
    link: "/home",
    Icon: Home,
    new: false
  },
  {
    text: "Projects",
    link: "/projects",
    Icon: Project,
    new: true
  },
  {
    text: "Payments",
    link: "/payments",
    Icon: Payment,
    new: true
  },
  {
    text: "Reports",
    link: "/reports",
    Icon: Report,
    new: true
  },
  {
    text: "Expenses",
    link: "/expenses",
    Icon: Expense,
    new: true
  },
  {
    text: "Clients",
    link: "/clients",
    Icon: Client,
    new: true
  },
  {
    text: "Suppliers",
    link: "/suppliers",
    Icon: Supplier,
    new: true
  },
  {
    text: "WorkLoad",
    link: "/workload",
    Icon: WorkLoad,
    new: false
  },
  {
    text: "Settings",
    link: "/settings",
    Icon: Setting,
    new: false
  }
];
