import React, { useEffect, useRef, useState } from 'react';
import { initAlloy, openAlloy } from '../../lib/alloy';
import { styled } from '../../stitches.config';
import { Button } from '../Button/Button';
import chroma from 'chroma-js'

const Container = styled('div', {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    border: '1px solid $mauve8',
    borderRadius: '$3',
    minHeight: '442px',
    backgroundImage: "radial-gradient( $colors$mauve11 1px, transparent 0)",
    backgroundColor: "$mauve2",
    backgroundPosition: "0 0",
    backgroundSize: "30px 30px",
})

const ColorEditorContainer = styled('div', {
    position: 'absolute',
    bottom: 0,
    padding: '$3 $6',
    display: 'flex',
    borderTop: '1px solid $mauve8',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '$mauve3',
    borderRadius: '$3',
    gap: '$2'

})

const Box = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2'
})

const StyledLabel = styled('label', {
    fontSize: '$3',
    color: '$text-secondary',
})

const StyledButton = styled(Button);



const AlloyDemo = () => {

    const anchor = useRef(null);
    const [accentColor, setAccentColor] = useState('#2642EF')

    const luminance = chroma(accentColor).luminance();
    const colors = {
        primary: accentColor,
        secondary: luminance < 0.5 ? chroma(accentColor).brighten().hex() : chroma(accentColor).darken().hex()
    }

    useEffect(() => {
        initAlloy(colors);
    }, [accentColor])

    const callback = () => { }
    const handleOpen = () => {
        openAlloy(callback, anchor);
    }


    return (
        <Container>
            <StyledButton onClick={() => { handleOpen() }} css={{
                backgroundColor: colors.primary,
                '&:hover': {
                    backgroundColor: colors.secondary
                }

            }} > Click me</StyledButton>
            <ColorEditorContainer>
                <Box>
                    <StyledLabel> Preview in your app</StyledLabel>
                    <input></input>
                </Box>
                <Box>
                    <StyledLabel> Accent Color</StyledLabel>
                    <input type={'color'} defaultValue={accentColor} onChange={(e) => { setAccentColor(e.currentTarget.value) }}></input>
                </Box>
            </ColorEditorContainer>
        </Container>
    )
}

export { AlloyDemo };