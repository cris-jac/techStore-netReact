import { MenuRounded, WorkspacePremiumRounded, ViewInArRounded } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useState } from 'react'

interface Props {
    categories: string[];
    brands: string[];
  }

  const localStyle = {
    button: {
        mx: 1, 
        textTransform: 'capitalize',
        color: 'text.primary',
    },
}

const SideMenu = ({ categories, brands }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
      };
  
    const list = (
      <Box
        sx={{ width: 'medium' }}
        role="presentation"
        onClick={toggleDrawer}
      >
        <Typography variant='h6'>Catalog</Typography>
        <Divider />
        <Typography variant='h6'>Catalog</Typography>
        <Divider />
        <Typography variant='h6'>Categories</Typography>
        <List>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    <ViewInArRounded fontSize='small'/>
                {/* {index % 2 === 0 ? "opt 1" : "opt 2"} */}
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant='h6'>Brands</Typography>
        <List>
          {brands.map((brand) => (
            <ListItem key={brand} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? "opt 1" : "opt 2"} */}
                  <WorkspacePremiumRounded fontSize='small'/>
                </ListItemIcon>
                <ListItemText primary={brand} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant='h6'>Contact</Typography>
        <Typography variant='h6'>Sign In</Typography>


      </Box>
    );
  
    return (
      <div>
        <Button onClick={toggleDrawer}
            size="small"
            sx={localStyle.button}
            startIcon={<MenuRounded />}
        >
        Menu</Button>
        <Drawer open={isOpen} onClose={toggleDrawer}>
          {list}
        </Drawer>
      </div>
    );
}

export default SideMenu