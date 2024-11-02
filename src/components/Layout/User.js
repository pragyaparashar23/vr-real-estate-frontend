import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDown,
  CircleUserRound,
  LogOut,
  UserRoundPen,
} from "lucide-react";
import { useAuth } from "../../services/auth-provider";
import { useNavigate } from "react-router-dom";

const solutions = [
  {
    name: "Profile",
    description: "Get a better understanding of your traffic",
    url: "profile",
    icon: (
      <UserRoundPen
        size={40}
        color="#2b2b2b"
        strokeWidth={1.75}
        absoluteStrokeWidth
      />
    ),
  },
  {
    name: "Logout",
    description: "Speak directly to your customers",
    url: "logout",
    // icon: CursorArrowRaysIcon,
    icon: (
      <LogOut
        size={40}
        color="#2b2b2b"
        strokeWidth={1.75}
        absoluteStrokeWidth
      />
    ),
  },
  // {
  //   name: "Security",
  //   description: "Your customers' data will be safe and secure",
  //   href: "#",
  //   // icon: FingerPrintIcon,
  // },
  // {
  //   name: "Integrations",
  //   description: "Connect with third-party tools",
  //   href: "#",
  //   // icon: SquaresPlusIcon,
  // },
  // {
  //   name: "Automations",
  //   description: "Build strategic funnels that will convert",
  //   href: "#",
  //   // icon: ArrowPathIcon,
  // },
];

export default function UserIcon() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    if (url === "logout") {
      logout();
      navigate("/");
    }
    if (url === "profile") {
      navigate("/user-profile");
    }
  };

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <CircleUserRound color="white" size={30} className="cursor-pointer" />
        {/* <ChevronDownIcon aria-hidden="true" className="h-5 w-5" /> */}
        {/* <ChevronDown size={40} color="white" /> */}
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex  max-w-max -translate-x-[90%] px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className=" max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {solutions.map((item) => (
              <div
                key={item.name}
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 items-center cursor-pointer"
                onClick={() => handleNavigation(item.url)}
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  {item?.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {item?.name}
                    <span className="absolute inset-0" />
                  </div>
                  {/* <p className="mt-1 text-gray-600">{item.description}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
