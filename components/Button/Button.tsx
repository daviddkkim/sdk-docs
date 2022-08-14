import * as React from "react";
import { ButtonColor, ButtonSize, ButtonTextAlignment } from "./types";
import { styled } from "../../stitches.config";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: React.CSSProperties;
  size?: ButtonSize;
  color?: ButtonColor;
  textAlign?: ButtonTextAlignment;
  stretch?: boolean;
}

const StyledButton = styled("button", {
  all: "unset",
  transition: "all 150ms ease",
  borderRadius: "$2",
  boxSizing: "border-box",
  "&:focus-visible": {
    boxShadow:
      "0 0 0 2px $colors$border-focus-base, 0 0 0 3px $colors$border-focus-additive",
  },
  variants: {
    color: {
      primary: {
        background: "$background-accent-neutral",
        border: "1px solid $colors$border-accent",
        color: "$text-contrast",
        boxShadow: "1px 1px 1px $colors$shadow-default",
        "&:hover": {
          background: "$background-accent-hover",
        },
      },
      secondary: {
        backgroundColor: "$background-primary-neutral",
        border: "1px solid $border-contrast",
        color: "$text-accent",
        boxShadow: "1px 1px 1px $colors$shadow-default",
        "&:hover": {
          backgroundColor: "$background-primary-hover",
        },
      },
      ghost: {
        backgroundColor: "$background-ghost-neutral",
        border: "1px solid transparent",
        color: "$text-accent",
        "&:hover": {
          backgroundColor: "$background-ghost-hover",
        },
      },
    },
    textAlign: {
      start: {
        textAlign: "start",
      },
      end: {
        textAlign: "end",
      },
      center: {
        textAlign: "center",
      },
    },
    stretch: {
      true: {
        width: "100%",
      },
      false: {
        width: "fit-content",
      },
    },
    size: {
      small: {
        padding: "0 $2",
        fontSize: "$2",
        height: "$5",
      },
      medium: {
        padding: "0 $3",
        fontSize: "$3",
        height: "$6",
      },
      large: {
        padding: "0 $4",
        fontSize: "$4",
        height: "calc( $6 + $2)",
      },
    },
    disabledStyle: {
      true: {
        pointerEvents: "none",
        cursor: "not-allowed",
        opacity: "0.55",
      },
      false: {
        cursor: "pointer",

        "&:active": {
          transform: "scale(1.1)",
        },
      },
    },
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      disabled = false,
      style,
      size = ButtonSize.medium,
      color = ButtonColor.primary,
      textAlign = ButtonTextAlignment.center,
      stretch = false,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledButton
        onClick={onClick}
        disabled={disabled}
        style={style}
        size={size}
        color={color}
        disabledStyle={disabled}
        textAlign={textAlign}
        stretch={stretch}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
