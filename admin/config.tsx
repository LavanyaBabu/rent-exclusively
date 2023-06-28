import { AdminConfig } from "@keystone-6/core/types";
import Logo from "./components/logo";
import CustomNavigation from "./components/navigation";

export const components: AdminConfig["components"] = {
  Logo,
  Navigation: CustomNavigation
};
