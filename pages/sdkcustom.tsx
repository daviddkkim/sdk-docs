import React, { useEffect, useRef, useState } from "react";
import { initAlloy, openAlloy } from "../lib/alloy";
import { styled, keyframes } from "../stitches.config";
import { Button } from "../components/Button/Button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import chroma from "chroma-js";
import { ButtonColor, ButtonSize } from "../components/Button/types";
import { PluginUI } from "../components/PluginUi/PluginUI";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowRightIcon, ArrowLeftIcon, EnterFullScreenIcon } from '@radix-ui/react-icons'

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});


export const ActionTitle = styled("span", {
  fontWeight: 600,
  color: "$mauve11",
  fontSize: "$4",
});

export const ActionText = styled("span", {
  fontSize: "$4",
});

export const Accordion = styled(AccordionPrimitive.Root, {
  width: "100%",
  //backgroundColor: '$mauve6'
});

export const AccordionItem = styled(AccordionPrimitive.Item, {
  borderBottom: "1px solid $mauve6",
});
export const AccordionHeader = styled(AccordionPrimitive.Header, {
  all: "unset",
  display: "flex",
  flexDirection: "column",
});

export const AccordionTrigger = styled(AccordionPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "$mauve3",
  padding: "$3 $4",
  height: 40,
  flex: 1,
  display: "flex",
  gap: "$4",
  fontSize: "$4",
  color: "$mauve11",
  '&[data-state="closed"]': {
    "&::before": {
      content: "+",
    },
  },
  '&[data-state="open"]': {
    backgroundColor: "$mauve1",
    "&::before": {
      content: "-",

    },
  },
  "&:hover": { backgroundColor: "$mauve6" },
});

export const AccordionContent = styled(AccordionPrimitive.Content, {
  overflowX: "scroll",
  fontSize: 15,
  color: "$mauve12",
  backgroundColor: "$mauve1",
  padding: "$3 $4",

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});


const Container = styled("div", {
  display: "flex",
  flexDirection: "row",
  border: "1px solid $mauve8",
  borderRadius: "$3",
  minHeight: "100vh",
  backgroundImage: "radial-gradient( $colors$mauve11 1px, transparent 0)",
  backgroundColor: "$mauve2",
  backgroundPosition: "0 0",
  backgroundSize: "30px 30px",
});
const Separator = styled('div', {
  width: '100%',
  height: '1px',
  backgroundColor: '$mauve8'
})

const ColorEditorContainer = styled("div", {
  bottom: 0,
  display: "flex",
  borderRight: "1px solid $mauve6",
  flexDirection: "column",
  minHeight: '100vh',
  boxSizing: "border-box",
  backgroundColor: "$mauve1",
  gap: "$5",
  minWidth: '300px'
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
  color: "mauve12",
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

const Title = styled('h3', {
  margin: 0,
  color: '$mauve11',
  fontWeight: 500,
  fontSize: '$4',
  '&:first-letter': {
    textTransform: 'capitalize'
  }
})

const SDKCustom = () => {

  const defaultAccent = "#191919";
  const defaultText = '#191919';
  const defaultBackground = '#ffffff';
  const [accentColor, setAccentColor] = useState(defaultAccent);
  const [background, setBackgroundColor] = useState(defaultBackground);
  const [text, setText] = useState(defaultText);
  const [buttonColor, setButtonColor] = useState(defaultAccent);
  const [buttonHoverColor, setButtonHoverColor] = useState('#464646')
  const [buttonText, setButtonTextColor] = useState('#ffffff')
  const [pbuttonColor, setpButtonColor] = useState(defaultAccent);
  const [pbuttonHoverColor, setpButtonHoverColor] = useState('#464646')
  const [pbuttonText, setpButtonTextColor] = useState('#ffffff')
  const [cardColor, setCardColor] = useState(defaultBackground);
  const [cardHoverColor, setCardHoverColor] = useState('#EBEBE6')
  const [cardText, setCardText] = useState(defaultText);
  const [selectedItem, setSelectedItem] = useState('')
  const [url, setUrl] = useState("");
  const [showIframe, setShowIframe] = useState(false);
  const [accordionValues, setAccordionValues] = useState(['theme'])
  const [page, setPage] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const luminance = chroma(accentColor).luminance();
  const secondaryColor = luminance < 0.5
    ? chroma(accentColor).brighten().hex()
    : chroma(accentColor).darken().hex();
  console.log(secondaryColor)
  console.log(buttonHoverColor)
  const colors = {
    primary: background,
    accent: accentColor,
    text: text,
    secondary: secondaryColor,
    custom: {
      button: {
        backgroundColor: buttonColor !== defaultAccent ? buttonColor : accentColor,
        hoverBackground: buttonHoverColor !== secondaryColor ? buttonHoverColor : secondaryColor,
        text: buttonText !== defaultText ? buttonText : text,
      },
      card: {
        backgroundColor: cardColor !== defaultBackground ? cardColor : background,
        hoverBackground: cardHoverColor,
        text: cardText !== defaultText ? cardText : text,
      },
      pbutton: {
        backgroundColor: pbuttonColor !== defaultAccent ? pbuttonColor : accentColor,
        hoverBackground: pbuttonHoverColor !== secondaryColor ? pbuttonHoverColor : secondaryColor,
        text: pbuttonText !== defaultText ? pbuttonText : text,
      }
    }
  };


  useEffect(() => {
    initAlloy(colors);
  }, [accentColor, background, text, buttonColor, buttonHoverColor, buttonText, cardColor, cardHoverColor, cardText]);


  const callback = () => { };
  const handleOpen = (anchor?: string) => {
    openAlloy(callback, anchor);
  };

  const handleSelection = (selectedItem: string) => {
    if (selectedItem.length > 1) setAccordionValues([selectedItem])
  }
  const handleIframeOpen = () => {
    const anchorElementSelected = document.getElementById("iframe");
    setShowIframe(!showIframe);
    openAlloy(callback, anchorElementSelected?.id);
  };
  console.log('page', page)
  return (
    <Container id={"anchor"}>
      <ColorEditorContainer>
        <Accordion type="multiple" value={accordionValues} onValueChange={(values) => {
          setAccordionValues(values)
        }}>
          <AccordionItem value="theme">
            <AccordionHeader>
              <AccordionTrigger>
                <Title>Theme</Title>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <Box css={{
                gap: '$2'
              }}>
                <Box >
                  <StyledLabel> Accent</StyledLabel>
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
                  <StyledLabel> Background</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={background}
                    onChange={(e) => {
                      setBackgroundColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
                <Box>
                  <StyledLabel> Text</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={text}
                    onChange={(e) => {
                      setText(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
              </Box>

            </AccordionContent>

          </AccordionItem>
          <AccordionItem value="button">
            <AccordionHeader>
              <AccordionTrigger>
                <Title> .Main-Button </Title>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <Box css={{
                gap: '$2'
              }}>
                <Box >
                  <StyledLabel> Background</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={buttonColor}
                    onChange={(e) => {
                      setButtonColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
                <Box>
                  <StyledLabel> Hover-Background</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={buttonHoverColor}
                    onChange={(e) => {
                      setButtonHoverColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
                <Box>
                  <StyledLabel> Text</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={buttonText}
                    onChange={(e) => {
                      setButtonTextColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
              </Box>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="card">
            <AccordionHeader>
              <AccordionTrigger>
                <Title> .Card </Title>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <Box css={{
                gap: '$2'
              }}>
                <Box >
                  <StyledLabel> Background</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={cardColor}
                    onChange={(e) => {
                      setCardColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
                <Box>
                  <StyledLabel> Hover-Background</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={cardHoverColor}
                    onChange={(e) => {
                      setCardHoverColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
                <Box>
                  <StyledLabel> Text</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={cardText}
                    onChange={(e) => {
                      setCardText(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
              </Box>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pbutton">
            <AccordionHeader>
              <AccordionTrigger>
                <Title> .Picture-Button </Title>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <Box css={{
                gap: '$2'
              }}>
                <Box >
                  <StyledLabel> Background</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={pbuttonColor}
                    onChange={(e) => {
                      setpButtonColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
                <Box>
                  <StyledLabel> Hover-Background</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={pbuttonHoverColor}
                    onChange={(e) => {
                      setpButtonHoverColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
                <Box>
                  <StyledLabel> Text</StyledLabel>
                  <StyledInput
                    type={"color"}
                    defaultValue={pbuttonText}
                    onChange={(e) => {
                      setpButtonTextColor(e.currentTarget.value);
                    }}
                    css={{ padding: "1px 2px" }}
                  ></StyledInput>
                </Box>
              </Box>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="logo">
            <AccordionHeader>
              <AccordionTrigger>
                <Title> .Logo </Title>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              No customization available yet.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Box css={{
          padding: '$4',
          marginTop: 'auto'
        }}
        onClick={()=>{handleOpen()}}>
        <Button stretch> Simulate</Button>
        </Box>
      </ColorEditorContainer>
      <Box
        style={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          position:'relative',
          overflowY: 'scroll',
          padding: '$7'
        }}
      >
        <Box css={{
          minWidth: '480px',
          gap: '$4',
          padding: '$6',
          height: '100%',
          justifyContent: 'center'
        }}>
          <Box css={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
            <Button color={ButtonColor.secondary} onClick={() => {
              setPage(Math.abs(page - 1) % 3)
            }}> <ArrowLeftIcon /> </Button>
            <Button color={ButtonColor.secondary} onClick={() => { setFullScreen(!fullScreen) }}> <EnterFullScreenIcon /> </Button>

            <Button color={ButtonColor.secondary} onClick={() => { setPage((page + 1) % 3) }}> <ArrowRightIcon /> </Button>
          </Box>
          {!fullScreen && <PluginUI selectedItem={selectedItem} onChange={handleSelection} colors={colors} page={page} />
          }
          {
            fullScreen && 
            <Box css={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
             <PluginUI selectedItem={selectedItem} onChange={handleSelection} colors={colors} page={0} />
             <PluginUI selectedItem={selectedItem} onChange={handleSelection} colors={colors} page={1} />
             <PluginUI selectedItem={selectedItem} onChange={handleSelection} colors={colors} page={2} />
            </Box>
          }
        </Box>
      </Box>
      {
        showIframe && (
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
        )
      }
    </Container >
  );
};

export default SDKCustom;
