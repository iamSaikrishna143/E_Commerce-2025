import {
  ChartBar,
  FilePlus2Icon,
  GalleryVerticalEnd,
  PackageSearch,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setUserLogout } from "../../redux/slices/authSlice";
import useToast from "../../hooks/use-toast";

// Menu items.
const items = [
  {
    title: "Create Products",
    url: "/admin/dashboard",
    icon: FilePlus2Icon,
  },
  {
    title: "All Products",
    url: "/admin/dashboard/all-products",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Orders",
    url: "/admin/dashboard/orders",
    icon: PackageSearch,
  },
  {
    title: "Analytics",
    url: "/admin/dashboard/analytics",
    icon: ChartBar,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(setUserLogout());
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out",
      variant: "success",
    });
    window.location.href = "/admin/login";
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className="text-xl font-bold">Dashboard</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`${
                    pathname === item.url && "bg-zinc-200 dark:bg-zinc-600"
                  }`}
                >
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
