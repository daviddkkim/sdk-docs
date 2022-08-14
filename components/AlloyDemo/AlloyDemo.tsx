import React, { useEffect, useRef, useState } from "react";
import { initAlloy, openAlloy } from "../../lib/alloy";
import { styled } from "../../stitches.config";
import { Button } from "../Button/Button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import chroma from "chroma-js";
import { ButtonSize } from "../Button/types";

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid $mauve8",
  borderRadius: "$3",
  minHeight: "442px",
  backgroundImage: "radial-gradient( $colors$mauve11 1px, transparent 0)",
  backgroundColor: "$mauve2",
  backgroundPosition: "0 0",
  backgroundSize: "30px 30px",
});

const ColorEditorContainer = styled("div", {
  bottom: 0,
  padding: "$3 $6",
  display: "flex",
  borderTop: "1px solid $mauve8",
  flexDirection: "column",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "$mauve3",
  borderRadius: "$3",
  gap: "$2",
});

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
});

const StyledLabel = styled("label", {
  display: "flex",
  gap: "$2",
  alignItems: "center",
  fontSize: "$3",
  color: "$text-secondary",
});

const StyledButton = styled(Button);

const StyledIframe = styled("iframe", {
  height: "90vh",
  width: "85vw",
  border: "1px solid $mauve8",
  borderRadius: "0 0 $3 $3",
  backgroundColor: "$mauve3",
  boxShadow: "0px 0px 10px $colors$shadow-default",
});

const IframeTopBar = styled("div", {
  width: "100%",
  backgroundColor: "$mauve1",
  borderRadius: "$3 $3 0 0",
  border: "1px solid $mauve8",
  borderBottom: "none",
  boxSizing: "border-box",
  padding: "$2",
  display: "flex",
  alignItem: "center",
});

const Mask = styled("div", {
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "$mauveA6",
  backdropFilter: "blur(10px)",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
});

const RedButton = styled("button", {
  size: "$3",
  backgroundColor: "$tomato9",
  borderRadius: "$pill",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: "$tomato11",
  },
});

const StyledInput = styled("input", {
  border: " 1px solid $mauve8",
  borderRadius: " $1",
  padding: "$1 $2",
  outline: "none",
  fontSize: "$3",
  "&:focus-within": {
    border: "1px solid $border-accent",
  },
});

const AlloyDemo = () => {
  const [accentColor, setAccentColor] = useState("#2642EF");
  const [url, setUrl] = useState("");
  const [showIframe, setShowIframe] = useState(false);

  const luminance = chroma(accentColor).luminance();
  const colors = {
    primary: accentColor,
    secondary:
      luminance < 0.5
        ? chroma(accentColor).brighten().hex()
        : chroma(accentColor).darken().hex(),
  };

  useEffect(() => {
    initAlloy(colors);
  }, [accentColor]);

  const callback = () => {};
  const handleOpen = (anchor?: string) => {
    /*       const anchorElementSelected = document.getElementById('anchor');
              console.log(anchorElementSelected)
              openAlloy(callback, anchorElementSelected?.id); */
    openAlloy(callback, anchor);
  };

  const handleIframeOpen = () => {
    const anchorElementSelected = document.getElementById("iframe");
    setShowIframe(!showIframe);
    openAlloy(callback, anchorElementSelected?.id);
  };

  return (
    <Container id={"anchor"}>
      <Box
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledButton
          onClick={() => {
            handleOpen();
          }}
          css={{
            backgroundColor: colors.primary,
            "&:hover": {
              backgroundColor: colors.secondary,
            },
          }}
        >
          {" "}
          Click me
        </StyledButton>
      </Box>
      <ColorEditorContainer>
        <Box>
          <StyledLabel> Accent Color</StyledLabel>
          <StyledInput
            type={"color"}
            defaultValue={accentColor}
            onChange={(e) => {
              setAccentColor(e.currentTarget.value);
            }}
            css={{ padding: "1px 2px" }}
          ></StyledInput>
        </Box>
        <Box>
          <StyledLabel>
            {" "}
            Preview in your app <ExternalLinkIcon />
          </StyledLabel>

          <Box
            css={{ flexDirection: "row", width: "100%", alignItems: "center" }}
          >
            <StyledInput
              placeholder={"Your app url. ex.) https://davidkim.vercel.app/"}
              value={url}
              onChange={(e) => {
                setUrl(e.currentTarget.value);
              }}
              css={{ width: "100%" }}
            ></StyledInput>
            <Button
              size={ButtonSize.small}
              onClick={() => {
                handleIframeOpen();
              }}
            >
              {" "}
              Open{" "}
            </Button>
          </Box>
        </Box>
      </ColorEditorContainer>
      {showIframe && (
        <Mask>
          <Box
            css={{
              gap: 0,
            }}
          >
            <IframeTopBar>
              <RedButton
                onClick={() => {
                  setShowIframe(!showIframe);
                }}
              />
            </IframeTopBar>
            <StyledIframe src={url} id={"iframe"} />
          </Box>
        </Mask>
      )}
    </Container>
  );
};

export { AlloyDemo };
