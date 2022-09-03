import * as React from "react";
import { CSS, styled } from "../../stitches.config";
import { forwardRef } from "react";
import { CameraIcon, IdCardIcon, PersonIcon } from '@radix-ui/react-icons'
import { Box } from "../Box";
import { Button } from "../Button/Button";

const Header = styled('div', {
    display: 'flex',
    padding: '$5',
    width: '100%',
    backgroundColor: '$mauve1',
    border: '1px solid $mauve5',
    borderRadius: '$3 $3 0 0',
    borderBottom: 'none',
    fontSize: '$3',
    boxSizing: "border-box",

})

const Body = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 $5',
    width: '100%',
    minHeight: '240px',
    justifyContent: 'center',
    backgroundColor: '$mauve1',
    border: '1px solid $mauve5',
    borderTop: 'none',
    borderBottom: 'none',
    fontSize: '$3',
    boxSizing: "border-box",


})

const Footer = styled('div', {
    display: 'flex',
    padding: '$5',
    width: '100%',
    backgroundColor: '$mauve1',
    border: '1px solid $mauve5',
    borderRadius: '0 0 $3 $3',
    borderTop: 'none',
    fontSize: '$3',
    boxSizing: "border-box",


})

const Card = styled('div', {
    padding: '$2 $3',
    display: 'flex',
    width: '100%',
    border: '1px solid $mauve8',
    borderRadius: '$2',
    alignItems: 'center',
    gap: '$2',
    lineHeight: '$3',
    fontSize: '$3',
    boxSizing:'border-box'

})

const StyledButton = styled(Button,
    {
    });

const PluginUI = ({ selectedItem, onChange, page = 0, colors }: {
    page?: number,
    selectedItem: string, onChange: (selected: string) => void, colors: {
        primary: string;
        accent: string;
        text: string;
        secondary: string;
        custom?: {
            button?: {
                backgroundColor?: string;
                hoverBackground?: string;
                text?: string;
            },
            card?: {
                backgroundColor?: string;
                hoverBackground?: string;
                text?: string
            },
            pbutton?: {
                backgroundColor?: string;
                hoverBackground?: string;
                text?: string
            }
        }
    }
}) => {

    const [selected, setSelected] = React.useState(selectedItem);
    const selcetedStyle: React.CSSProperties = selected ? { boxShadow: '0px 0px 8px red, 0px 0px 2px darkOrange' } : {};



    const buttonStyle: CSS = {
        backgroundColor: colors.custom?.button?.backgroundColor ? colors.custom.button.backgroundColor : colors.accent,
        color: colors.custom?.button?.text ? colors.custom.button.text : colors.text,
        "&:hover": {
            backgroundColor: colors.custom?.button?.hoverBackground ? colors.custom.button.hoverBackground : colors.secondary,
        },
    }

    const pbuttonStyle: CSS = {
        backgroundColor: colors.custom?.pbutton?.backgroundColor ? colors.custom.pbutton.backgroundColor : colors.accent,
        color: colors.custom?.pbutton?.text ? colors.custom.pbutton.text : colors.text,
        "&:hover": {
            backgroundColor: colors.custom?.pbutton?.hoverBackground ? colors.custom.pbutton.hoverBackground : colors.secondary,
        },
    }

    const cardStyle: CSS = {
        backgroundColor: colors.custom?.card?.backgroundColor ? colors.custom.card.backgroundColor : colors.primary,
        color: colors.custom?.card?.text ? colors.custom.card.text : colors.text,
        "&:hover": {
            backgroundColor: colors.custom?.card?.hoverBackground ? colors.custom.card.hoverBackground : colors.primary,
        },
    }

    console.log(cardStyle)
    React.useEffect(() => {
        onChange(selected)
    }, [selected])

    return (
        <Box css={{ boxSizing: 'border-box', width: 480 }}>
            <Header>
                <Box css={{
                    gap: '$2', alignItems: 'center', flexDirection: 'row',
                }}

                    style={selected === 'logo' ? selcetedStyle : undefined}
                    onClick={() => { setSelected('logo') }}>
                    <Box css={{
                        size: '$5',
                        background: 'linear-gradient(60deg, $mauve5, $mauve9)',
                        borderRadius: '$2'
                    }}></Box>
                    <span>
                        Piggy Bank
                    </span>
                </Box>
            </Header>
            {page === 0 && (<><Body>
                <Box css={{
                    flexDirection: 'row',
                    gap: '$3',
                }}>
                    <Card
                        onClick={() => { setSelected('card') }}
                        style={selected === 'card' ? selcetedStyle : undefined}
                        css={
                            cardStyle
                        }
                    >
                        <PersonIcon style={{ color: colors.accent }} />

                        Radhika
                    </Card>
                    <Card
                        onClick={() => { setSelected('card') }}
                        style={selected === 'card' ? selcetedStyle : undefined}
                        css={
                            cardStyle
                        }
                    >
                        <PersonIcon style={{ color: colors.accent }} />
                        Mauro
                    </Card>
                </Box>

            </Body>
                <Footer> <StyledButton stretch onClick={() => { setSelected('button') }}
                    css={buttonStyle}

                    style={selected === 'button' ? selcetedStyle : undefined}
                >Next</StyledButton></Footer></>)}
            {page === 1 && (<><Body>
                <Box css={{
                    flexDirection: 'row',
                    gap: '$3',
                }}>
                    <Card
                        onClick={() => { setSelected('card') }}
                        style={selected === 'card' ? selcetedStyle : undefined}
                        css={
                            cardStyle
                        }
                    >
                        <PersonIcon style={{ color: colors.accent }} />

                        Passport
                    </Card>
                    <Card
                        onClick={() => { setSelected('card') }}
                        style={selected === 'card' ? selcetedStyle : undefined}
                        css={
                            cardStyle
                        }
                    >
                        <IdCardIcon style={{ color: colors.accent }} />
                        License
                    </Card>
                </Box>

            </Body>
                <Footer> <StyledButton stretch onClick={() => { setSelected('button') }}
                    css={buttonStyle}

                    style={selected === 'button' ? selcetedStyle : undefined}
                >Next</StyledButton></Footer></>)}
            {page === 2 && (<><Body>
                <Box
                    css={{
                        flexDirection: 'row',
                        justifyContent:'space-between'
                    }}>
                    <p style={{
                        color: colors.text
                    }}>
                        take some picturessss
                    </p>
                    <Box css={{
                        flexDirection: 'column',
                        gap: '$3',
                    }}>

                        <Card
                            onClick={() => { setSelected('card') }}
                            style={selected === 'card' ? selcetedStyle : undefined}
                            css={
                                cardStyle
                            }
                        >
                            <StyledButton stretch onClick={() => { setSelected('button') }}
                                css={pbuttonStyle}

                                style={selected === 'button' ? selcetedStyle : undefined}
                            >Front Picture</StyledButton>
                        </Card>
                        <Card
                            onClick={() => { setSelected('card') }}
                            style={selected === 'card' ? selcetedStyle : undefined}
                            css={
                                cardStyle
                            }
                        >
                            <StyledButton stretch onClick={() => { setSelected('button') }}
                                css={pbuttonStyle}

                                style={selected === 'button' ? selcetedStyle : undefined}
                            >Back Picture</StyledButton>
                        </Card>
                    </Box>
                </Box>
            </Body>
                <Footer> <StyledButton stretch onClick={() => { setSelected('button') }}
                    css={buttonStyle}

                    style={selected === 'button' ? selcetedStyle : undefined}
                >Next</StyledButton></Footer></>)}
        </Box>
    )
}

export { PluginUI }