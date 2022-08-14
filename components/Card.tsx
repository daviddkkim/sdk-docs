import React from "react";
import { styled } from "../stitches.config";

const StyledCardContainer = styled("div", {
  width: "100%",
  border: "1px solid $mauve6",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  borderRadius: "$3",
  backgroundColor: "$mauve2",
  boxShadow: "0px 0px 4px $colors$mauveA3",
});

const StyledHeader = styled("div", {
  padding: "$3",
  display: "flex",
  fontSize: "$4",
  fontWeight: "500",
  boxSizing: "border-box",
});

const StyledBody = styled("div", {
  padding: "$3",
  display: "flex",
  boxSizing: "border-box",
});

const StyledFooter = styled("div", {
  borderTop: "1px solid $mauve6",
  padding: "$3",
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  boxSizing: "border-box",
});

interface CardProps {
  title: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  style?: React.CSSProperties;
}

const Card = ({ title, body, footer, style }: CardProps) => {
  return (
    <StyledCardContainer style={style}>
      <StyledHeader>{title}</StyledHeader>
      <StyledBody>{body}</StyledBody>
      <StyledFooter>{footer}</StyledFooter>
    </StyledCardContainer>
  );
};

export default Card;
