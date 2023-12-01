import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/Person';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const MobileSidebar = ({ role = '', userName = '' }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Schedule');
  const navigate = useNavigate();
  useEffect(() => {
    // Add a listener for window resize event
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsCollapsed(true); // Collapse sidebar for mobile and tablet (adjust the width as needed)
      } else {
        setIsCollapsed(false);
      }
    };

    // Initialize state based on the initial window width
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goHome = () => {
    navigate('/');
  }

  return (
    <Box sx={{ width: 'auto', position: 'relative' }}>
        <Box sx={{ position: 'fixed', zIndex: 1, margin: '.75rem', }}>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)} >
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      <Box sx={!isCollapsed ? { width: '100%', transition: 'width .3s'} : { width: '0%', transition: 'width .3s',}} >
        <Box
          sx={{
            '& .pro-sidebar-inner': !isCollapsed ? {
              background: `${colors.primary[400]} !important`,
            } : {transition: '0.3s', visibility: 'hidden', background: `${colors.primary[400]} !important`},
            '& .pro-icon-wrapper': {
              backgroundColor: 'transparent !important',
            },
            '& .pro-inner-item': {
              padding: '5px 35px 5px 20px !important',
            },
            '& .pro-menu-item:hover': {
              color: '#868dfb !important',
            },
            '& .pro-menu-item.active': {
              color: '#6870fa !important',
            },
          }}
        >
          <ProSidebar 
            collapsed={isCollapsed} 
            style={isCollapsed ? { position: 'fixed', top: 0, zIndex: 0}: { position: 'fixed', top: 0, zIndex: 3}} 
            collapsedWidth={"0px"}
            >
            <Menu iconShape="square" >
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                // icon={<MenuOutlinedIcon />}
                style={{
                  margin: '4px 0 20px 0',
                  color: colors.grey[100],
                }}
              >
                {!isCollapsed && (
                  <div className="flex justify-between box-border ml-15">
                    <Typography variant="h6" color={colors.grey[100]}>
                      Welcome {userName}!
                    </Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}></IconButton>
                    <MenuOutlinedIcon />
                  </div>
                )}
              </MenuItem>

              {isCollapsed ? <div></div> : (
                <Box mb="25px">
                  <Box display="flex" justifyContent="center" alignItems="center" height={"120px"} marginBottom={'40px'}>
                    <img
                      alt="company-logo"
                      width="85%"
                      src={`../../assets/logo.png`}
                      style={{ cursor: 'pointer', borderRadius: '10%', margin: "100px 0 0 0" }}
                      onClick={goHome}
                    />
                  </Box>

                  <Box paddingLeft={isCollapsed ? 0 : '10%'} marginTop={"100px"}>
                    <Item
                      title="Schedule"
                      to="/"
                      icon={<CalendarTodayOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    {(role === "Management") &&
                    <Item
                      title="Quote Requests"
                      to="/quotes"
                      icon={<ContactsOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  }
                  <Item
                    title="Work Orders"
                    to="/workorder"
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {(role === "Management") &&
                    <Item
                      title="Employee"
                      to="/employee"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  }
                  {(role === "Management") &&
                    <Item
                      title="Customers"
                      to="/customers"
                      icon={<PersonIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  }
                  {(role === "Management") &&
                    <Item
                      title="Reports"
                      to="/reports"
                      icon={<BarChartOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  }
                  </Box>
                </Box>
              )}
            </Menu>
          </ProSidebar>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileSidebar;

