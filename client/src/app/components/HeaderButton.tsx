import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const localStyle = {
    button: {
        mx: 1, 
        textTransform: 'capitalize',
        color: 'text.primary',
    },
}

interface Props {
    to: string;
    label?: string;
    icon?: any;
    img?: any;
  }

const HeaderButton = ({ to, label, icon, img }: Props) => {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <Button size="small" sx={localStyle.button} startIcon={icon}>
        {img ? <img src={img} height={48}/> : label}
      </Button>
    </NavLink>
  );
};

export default HeaderButton;
