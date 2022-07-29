import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const navigate=useNavigate()

  return (
    <div>
        <React.Fragment key={"left"}>
          <IconButton onClick={()=>setState(true)} sx={{color:"black",ml:2}}>
            <MenuIcon/>
          </IconButton>
          <Drawer
            anchor={"left"}
            open={state}
            onClose={()=>setState(false)}           
          >
            <List sx={{width:200,mt:1}}>
                <ListItem key="1" disablePadding onClick={()=>navigate("/")}>
                    <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Web A" />
                    </ListItemButton>
                </ListItem>

                <ListItem key="2" disablePadding onClick={()=>navigate("/WebB")}>
                    <ListItemButton>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Web B" />
                    </ListItemButton>
                </ListItem>
            </List>
          </Drawer>
        </React.Fragment>
    </div>
  );
}
