import { Tabs, Tab, styled } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import React from 'react'
import { useNavigate, useOutlet } from 'react-router-dom'
import { TransitionProvider } from '@bomon/expand-router'

const Box = styled('div')({
    height: '100vh',
    width: '100vw',
    position: 'relative',

    '.bottom-tab': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',

        '.MuiTab-root': {
            flex: 1
        }
    }
})

function LinkTab(props: any) {
    const navigate = useNavigate()
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
                navigate(props.href)
            }}
            {...props}
        />
    );
}

export default function () {
    const outlet = useOutlet()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return <Box style={{display:'flex',paddingBottom:'72px'}}>
        {/* 路由窗口 */}
        <div style={{flex:1}}>
            <TransitionProvider>
                {outlet}
            </TransitionProvider>
        </div>
        {/* tab */}
        <Tabs className='bottom-tab' value={value} onChange={handleChange} aria-label="icon label tabs example">
            <LinkTab icon={<PhoneIcon />} label="RECENTS" href='/t/recents' />
            <LinkTab icon={<FavoriteIcon />} label="FAVORITES" href='/t/favorites' />
            <LinkTab icon={<PersonPinIcon />} label="NEARBY" href='/t/nearby' />
        </Tabs>
    </Box>
}