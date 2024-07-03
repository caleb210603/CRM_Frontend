import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface AccordionProps {
  name: string;
  url: string;
}

interface Props {
  name?: string;
  url: string;
  icon: any;
  accordion?: boolean;
  accordionOptions?: AccordionProps[];
  isExpanded: boolean;
}

export function SidebarItem({
  name,
  url,
  icon,
  accordion,
  accordionOptions,
  isExpanded,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  const location = useLocation();

  const isActive = location.pathname.split("/")[1] === url.split("/")[1];

  //Esto despliega el acordeon
  const handleAccordionToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  return (
    <>
      <div className="ml-4 mt-1 pl-2 pr-2">
        {accordion ? (
          <>
            <NavLink
              to={url}
              className={` group flex relative ${
                isExpanded
                  ? "w-[12rem] ml-4 origin-left transition-all duration-75"
                  : "w-[2.6rem]"
              } h-[3.8rem] mx-auto`}
              onMouseOver={() => setIsHover(true)}
              onMouseOut={() => setIsHover(false)}
            >
              <div
                className={` ${
                  isActive && "bg-primary text-white dark:text-black"
                } p-2 w-full group-hover:bg-primary group-hover:text-white dark:group-hover:text-black rounded transition-all duration-75 origin-left mt-5 flex gap-5 justify-between ${
                  isActive &&
                  isExpanded &&
                  "bg-primary origin-left text-white dark:text-black"
                }`}
              >
                <div className="flex gap-5">
                  <span>{icon}</span>
                  <span className={`${!isExpanded && "scale-0"} origin-left`}>
                    {name}
                  </span>
                </div>
                {isExpanded && (
                  <div
                    className="self-center hover:bg-primary brightness-150 rounded p-1"
                    onClick={handleAccordionToggle}
                  >
                    {isExpanded && isAccordionExpanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                )}
              </div>
              {isHover && !isExpanded && (
                <p className=" absolute top-3 bg-muted border left-[3.8rem] w-36 h-full flex items-center pl-2 text-[1.2rem] rounded-r-xl">
                  {name}
                </p>
              )}
            </NavLink>
            {isExpanded && (
              <ul
                className={`ml-[25px] bg-primary dark:bg-primary filter w-[80%] rounded-br-lg rounded-bl-lg flex flex-col justify-center  transition-max-height duration-300 ease-linear overflow-hidden ${
                  isAccordionExpanded ? "max-h-[200px]" : "max-h-0"
                }`}
              >
                <div className="py-1">
                  {accordionOptions?.map((option, index) => {
                    const isOptionActive = location.pathname === option.url;
                    return (
                      <NavLink key={index} to={option.url}>
                        <div
                          className={` px-4 bg-primary text-sm text-white p-1 rounded-sm`}
                        >
                          <div
                            className={` pl-2 bg-primary text-sm text-white p-1 rounded-sm ${
                              isOptionActive
                                ? "brightness-150"
                                : "hover:brightness-150"
                            }`}
                          >
                            {option.name}
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </ul>
            )}
          </>
        ) : (
          <NavLink
            to={url}
            className={`group flex relative ${
              isExpanded
                ? "w-[12rem] ml-4 origin-left transition-all duration-75"
                : "w-[2.6rem]"
            } h-[3.8rem] mx-auto`}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          >
            <div
              className={` ${
                isActive && "bg-primary text-white dark:text-black"
              } p-2 w-full group-hover:bg-primary group-hover:text-white dark:group-hover:text-black rounded transition-all duration-75 origin-left mt-5 flex gap-5 ${
                isActive &&
                isExpanded &&
                "bg-primary origin-left text-white dark:text-black"
              }`}
            >
              <span>{icon}</span>
              <span className={`${!isExpanded && "scale-0"} origin-left`}>
                {name}
              </span>
            </div>
            {isHover && !isExpanded && (
              <p className=" absolute top-3 bg-muted border left-[3.8rem] w-36 h-full flex items-center pl-2 text-[1.2rem] rounded-r-xl">
                {name}
              </p>
            )}
          </NavLink>
        )}
      </div>
    </>
  );
}

// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// interface AccordionProps {
//   name: string;
//   url: string;
// }

// interface Props {
//   name?: string;
//   url: string;
//   icon: any;
//   accordion?: boolean;
//   accordionOptions?: AccordionProps[];
//   isExpanded: boolean;
// }

// export function SidebarItem({
//   name,
//   url,
//   icon,
//   accordion,
//   accordionOptions,
//   isExpanded,
// }: Props) {
//   const [isHover, setIsHover] = useState(false);

//   const location = useLocation();

//   const isActive = location.pathname.split("/")[1] === url.split("/")[1];

//   return (
//     <>
//       <div className="ml-4 mt-1 pl-2 pr-2">
//         {accordion ? (
//           <>
//             <NavLink
//               to={url}
//               className={`group flex relative ${
//                 isExpanded
//                   ? "w-[12rem] ml-4 origin-left transition-all duration-75"
//                   : "w-[2.6rem]"
//               } h-[3.8rem] mx-auto`}
//               onMouseOver={() => setIsHover(true)}
//               onMouseOut={() => setIsHover(false)}
//             >
//               <div
//                 className={`${
//                   isActive && "bg-primary text-white dark:text-black"
//                 } p-2 w-full group-hover:bg-primary group-hover:text-white dark:group-hover:text-black rounded transition-all duration-75 origin-left mt-5 flex gap-5 justify-between ${
//                   isActive &&
//                   isExpanded &&
//                   "bg-primary origin-left text-white dark:text-black"
//                 }`}
//               >
//                 <div className="flex gap-5">
//                   <span>{icon}</span>
//                   <span className={`${!isExpanded && "scale-0"} origin-left`}>
//                     {name}
//                   </span>
//                 </div>
//               </div>
//               {isHover && !isExpanded && (
//                 <p className="absolute top-3 bg-muted border left-[3.8rem] w-36 h-full flex items-center pl-2 text-[1.2rem] rounded-r-xl">
//                   {name}
//                 </p>
//               )}
//             </NavLink>
//             {isExpanded && (
//               <Accordion type="single" collapsible className="w-full">
//                 <AccordionItem value="item-1">
//                   <AccordionTrigger>
//                     <div className="flex justify-between">
//                       <span>{name}</span>

//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <ul className="ml-[25px] pl-2 pb-1 pr-2 pt-2 bg-primary dark:bg-primary filter w-[80%] rounded-br-lg rounded-bl-lg flex flex-col gap-2">
//                       {accordionOptions?.map((option, index) => {
//                         const isOptionActive = location.pathname === option.url;
//                         return (
//                           <NavLink key={index} to={option.url}>
//                             <div
//                               className={`mb-1 bg-primary text-sm text-white p-1 rounded-sm ${
//                                 isOptionActive
//                                   ? "brightness-150"
//                                   : "hover:brightness-150"
//                               }`}
//                             >
//                               {option.name}
//                             </div>
//                           </NavLink>
//                         );
//                       })}
//                     </ul>
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             )}
//           </>
//         ) : (
//           <NavLink
//             to={url}
//             className={`group flex relative ${
//               isExpanded
//                 ? "w-[12rem] ml-4 origin-left transition-all duration-75"
//                 : "w-[2.6rem]"
//             } h-[3.8rem] mx-auto`}
//             onMouseOver={() => setIsHover(true)}
//             onMouseOut={() => setIsHover(false)}
//           >
//             <div
//               className={`${
//                 isActive && "bg-primary text-white dark:text-black"
//               } p-2 w-full group-hover:bg-primary group-hover:text-white dark:group-hover:text-black rounded transition-all duration-75 origin-left mt-5 flex gap-5 ${
//                 isActive &&
//                 isExpanded &&
//                 "bg-primary origin-left text-white dark:text-black"
//               }`}
//             >
//               <span>{icon}</span>
//               <span className={`${!isExpanded && "scale-0"} origin-left`}>
//                 {name}
//               </span>
//             </div>
//             {isHover && !isExpanded && (
//               <p className="absolute top-3 bg-muted border left-[3.8rem] w-36 h-full flex items-center pl-2 text-[1.2rem] rounded-r-xl">
//                 {name}
//               </p>
//             )}
//           </NavLink>
//         )}
//       </div>
//     </>
//   );
// }
