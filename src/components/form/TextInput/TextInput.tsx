import clsx from "clsx";
import { forwardRef, ReactNode, useMemo } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface TextInputProps extends InputProps {
  label?: ReactNode;
  errorMessage?: string;
  fullWidth?: boolean;
  inputClassName?: string;
  endAdornment?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      label,
      id,
      errorMessage,
      fullWidth,
      inputClassName,
      endAdornment,
      ...inputProps
    },
    ref
  ) => {
    const endAdornmentNode = useMemo(() => {
      if (typeof endAdornment === "string") {
        return (
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              {endAdornment}
            </span>
          </div>
        );
      }
      return <div className="input-group-append">{endAdornment}</div>;
    }, [endAdornment]);

    return (
      <div
        className={clsx(
          {
            "w-100": fullWidth,
          },
          className
        )}
      >
        <div>
          {label && (
            <label className="form-label w-100" htmlFor={id}>
              {label}
            </label>
          )}
        </div>
        <div>
          <input
            className={clsx("form-control form-control-solid", inputClassName)}
            id={id}
            ref={ref}
            {...inputProps}
          />
          {endAdornmentNode}
        </div>
      </div>
    );
  }
);
