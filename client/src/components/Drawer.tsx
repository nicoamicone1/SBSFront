import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton
          onClick={() => setState(true)}
          sx={{ color: "black", ml: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor={"left"} open={state} onClose={() => setState(false)}>
          <List sx={{ width: 200, mt: 1 }}>
            <a target="_blank" href="https://sbsweba.vercel.app/">
            <ListItem key="1" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Web A" />
              </ListItemButton>
            </ListItem>
            </a>

            <ListItem key="2" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Web B (Actual)" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
