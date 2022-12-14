import * as TabsPrimitive from '@radix-ui/react-tabs';
import { styled } from '../stitches.config';



const StyledTabs = styled(TabsPrimitive.Root, {
    display: 'flex',
    flexDirection: 'column'
})

const StyledTabsList = styled(TabsPrimitive.List, {
    display: 'flex',
    borderBottom: '1px solid $mauve6'
})

const StyledTabsTrigger = styled(TabsPrimitive.Trigger, {
    unset:'all',
    backgroundColor: 'transparent',
    outline: 'none',
    color:'$mauve11',
    border:'none',
    padding:'$2 $3',
    fontSize:'$3',
    borderRadius:'$3 $3 0 0',
    '&[data-state="active"]': {
        color: '$mauve12',
        boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
      },
    "&:hover": {
        backgroundColor: '$mauve3'
    }

})

const StyledTabsContent = styled(TabsPrimitive.Content, {

    padding:'$4 $1',

})


interface TabsProps {
    tabs: {
        label: string;
        value: string;
        content: React.ReactNode;
    }[];
    defaultValue: string;
    style?: React.CSSProperties;
}
const Tabs = ({ tabs, style, defaultValue }: TabsProps) => {
    return (
        <StyledTabs style={style} defaultValue={tabs[0].value}>
            <StyledTabsList>
                {tabs.map((tab) => {
                    return (
                        <StyledTabsTrigger value={tab.value} key={tab.value}>
                                {tab.label}
                        </StyledTabsTrigger>
                    )
                })}
            </StyledTabsList>
            {tabs.map((tab) => {
                return (
                    <StyledTabsContent value={tab.value} key={tab.value}>
                        {tab.content}
                    </StyledTabsContent>
                )
            })}
        </StyledTabs>
    )
}

export default Tabs;
