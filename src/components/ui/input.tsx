import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
   icon?: React.ReactNode;
   hasFocus?: boolean;
   onFocusChange?: (focused: boolean) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type, icon, hasFocus, onFocusChange, ...props }, ref) => {
      const handleFocus = () => {
         onFocusChange?.(true);
      };

      const handleBlur = () => {
         onFocusChange?.(false);
      };

      return icon ? (
         <div
            className={cn(
               hasFocus && "outline outline-2 outline-[#8774E1]",
               "flex flex-1 items-center gap-2 rounded-full bg-[#2C2C2C] p-3",
            )}
         >
            {icon && <div className="flex items-center">{icon}</div>}
            <input
               type={type}
               className={cn(
                  "placeholder:text-muted-foreground flex w-full rounded-md bg-transparent text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                  className,
               )}
               onFocus={handleFocus}
               onBlur={handleBlur}
               ref={ref}
               {...props}
            />
         </div>
      ) : (
         <input
            type={type}
            className={cn(
               "placeholder:text-muted-foreground flex w-full rounded-md border bg-transparent p-4 text-white shadow-sm transition-colors focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
               className,
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            {...props}
         />
      );
   },
);

Input.displayName = "Input";

export { Input };
