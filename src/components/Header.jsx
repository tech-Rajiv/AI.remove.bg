import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="flex border-b-2 sm:gap-20 mx-auto max-w-4xl justify-between items-center py-4 px-7">
      <div className="font-semibold text-xl">Image Hub</div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>try other tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col w-44">
                 
                  <NavLink
                    className="hover:bg-gray-100 w-full rounded-md px-2 py-3"
                    to={"/"}
                  >
                    background Remover
                  </NavLink>
                  <NavLink
                    className="hover:bg-gray-100 w-full rounded-md px-2 py-3 border-t-1"
                    to={"/compressimage"}
                  >
                    Size Reducer
                  </NavLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default Header;
