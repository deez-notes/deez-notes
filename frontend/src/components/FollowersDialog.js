import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import {useEffect, useState} from 'react'
import '../styles/scrollBar.css'
import axios from "axios";

var emails = ['nothing'];

function SimpleDialog(props) {
  const [Followers, setFollowers] = useState([]);
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  useEffect(() => {
    axios.get("http://localhost:8000/users/?user=" + String(localStorage.getItem('userData'))).then(res => {
      setFollowers(res.data.followers);
      emails = Followers;
    });
  }, []);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{textAlign:'center' }}>Followers</DialogTitle>
      <hr/>
      <List sx={{ pt: 0, pl:5, pr: 8 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        {/* <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem> */}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};



var emails2 = ['nothing'];

function SimpleDialog2(props) {
  const [Followers2, setFollowers2] = useState([]);
  const { onClose2, selectedValue2, open2 } = props;

  const handleClose2 = () => {
    onClose2(selectedValue2);
  };

  const handleListItemClick2 = (value) => {
    onClose2(value);
  };
  useEffect(() => {
    axios.get("http://localhost:8000/users/?user=" + String(localStorage.getItem('userData'))).then(res => {
      setFollowers2(res.data.following);
      emails2 = Followers2;
    });
  }, []);
  return (
    <Dialog onClose={handleClose2} open={open2}>
      <DialogTitle sx={{textAlign:'center' }}>Following</DialogTitle>
      <hr/>
      <List sx={{ pt: 0, pl:5, pr: 8 }}>
        {emails2.map((email) => (
          <ListItem button onClick={() => handleListItemClick2(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

      </List>
    </Dialog>
  );
}

SimpleDialog2.propTypes = {
  onClose2: PropTypes.func.isRequired,
  open2: PropTypes.bool.isRequired,
  selectedValue2: PropTypes.string.isRequired,
};





export default function FollowersDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [open2, setOpen2] = React.useState(false);
  const [selectedValue2, setSelectedValue2] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (value) => {
    setOpen2(false);
    setSelectedValue2(value);
  };


  useEffect(() => {
    axios.get("http://localhost:8000/users/?user=" + String(localStorage.getItem('userData'))).then(res => {
      emails = (res.data.followers);
      emails2 = (res.data.following);
    });
  }, []);

  return (
    <div>
         <Button className= "button" variant="outlined" onClick={handleClickOpen}
          sx={{
            width: '13em',
            borderColor: '#f3f7f9',
            color: '#f3f7f9',
            borderWidth: '3px',
            display: 'inline',
            margin: '4em',
            
          }}
          > Followers </Button>
          <Button className= "button" variant="outlined" onClick={handleClickOpen2}
          sx={{
            width: '13em',
            borderColor: '#f3f7f9',
            color: '#f3f7f9',
            borderWidth: '3px',
            display: 'inline',
            margin: '4em',
            
          }}
          
          > Following </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <SimpleDialog2
        selectedValue2={selectedValue2}
        open2={open2}
        onClose2={handleClose2}
      />
    </div>
  );
}