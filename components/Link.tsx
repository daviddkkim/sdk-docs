import React from "react";
import Link from "next/link";
import { styled } from "../stitches.config";

const StyledLink = styled("a", {
  textDecoration: "none",
  color: "$mauve11",
  "&:hover": {
    color: "$mauve12",
  },
});

export default StyledLink;
