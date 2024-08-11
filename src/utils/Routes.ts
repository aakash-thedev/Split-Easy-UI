import Account from "../components/Account/Account";
import Activity from "../components/Activity/Activity";
import AuthPage from "../components/AuthPage/AuthPage";
import Friends from "../components/Friends/Friends";
import Group from "../components/Group/Group";
import Premium from "../components/Premium/Premium";
import Settings from "../components/Settings/Settings";

const routes = [
  {
    path: "/auth",
    Component: AuthPage,
    protected: false,
  },
  {
    path: "/groups",
    Component: Group,
    protected: true,
  },
  {
    path: "/friends",
    Component: Friends,
    protected: true,
  },
  {
    path: "/activity",
    Component: Activity,
    protected: true,
  },
  {
    path: "/my-account",
    Component: Account,
    protected: true,
  },
  {
    path: "/settings",
    Component: Settings,
    protected: true,
  },
  {
    path: "/premium",
    Component: Premium,
    protected: true,
  },
];

export default routes;
