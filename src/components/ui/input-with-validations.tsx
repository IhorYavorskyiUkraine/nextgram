"use client";

import { useFormContext } from "react-hook-form";
import { ErrorText } from "./error-text";
import { Input } from "./input";
import { RequiredSymbol } from "./required-symbol";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label?: string;
   required?: boolean;
   className?: string;
}

export const InputWithValidations: React.FC<Props> = ({
   className,
   name,
   label,
   required,
   ...props
}) => {
   const {
      register,
      formState: { errors },
   } = useFormContext();

   const errorText = errors[name]?.message as string;

   return (
      <div className={className}>
         {label && (
            <p className="mb-1 font-medium text-white">
               {label} {required && <RequiredSymbol />}
            </p>
         )}
         <Input className="text-md h-12" {...register(name)} {...props} />
         {errorText && <ErrorText text={errorText} className="mt-2" />}
      </div>
   );
};
