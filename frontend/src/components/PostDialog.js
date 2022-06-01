import React from 'react';
import {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const pageUser = String(window.location.href).substring(30);

function PostDialogP(props) {
    let navigate = useNavigate();
    const { onClose, open, post_op, post_id} = props;

    const handleClose = () => {
        onClose();
      };

    const handleProfileClick = () => {
      navigate('/profile/' + post_op);
      window.location.reload();
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <List sx={{ pt: 0, pl:5, pr: 8 }}>
            <ListItem >
                <ListItemText primary={'ID: '+post_id} />
            </ListItem>
            <ListItem button onClick={() => handleProfileClick()}>
              <ListItemText primary="Go to OP's profile." />
            </ListItem>
        </List>
      </Dialog>
    );
  }

  PostDialogP.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    post_op: PropTypes.string.isRequired,
    post_id: PropTypes.string.isRequired,
  };

  function PostDialogOP(props) {
    let navigate = useNavigate();
    const { onClose, open, post_id} = props;
  
    const handleClose = () => {
        onClose();
      };

    const handleDeletePost = () => {
        axios.delete('http://localhost:8000/posts?id='+post_id)
        .then(res => console.log(res));
      window.location.reload();
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <List sx={{ pt: 0, pl:5, pr: 8 }}>
            <ListItem>
                <ListItemText primary={'ID: '+post_id} />
            </ListItem>
            <ListItem button onClick={() => handleDeletePost()}>
              <ListItemText primary="Delete post." />
            </ListItem>
        </List>
      </Dialog>
    );
  }

  PostDialogOP.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    post_id: PropTypes.string.isRequired,
  };

  export default function PostDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClickOpen2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };
  
    let dialog = null;
    if (props.post_op === localStorage.getItem('userData'))
        dialog = handleClickOpen2;
    else
        dialog = handleClickOpen;

    return (
      <div>
        <IconButton aria-label="settings" onClick={dialog}>
                  <MoreVertIcon />
                </IconButton>

        <PostDialogP
          open={open}
          post_op = {props.post_op}
          onClose={handleClose}
          post_id={props.post_id}
        />
        <PostDialogOP
          open={open2}
          onClose={handleClose2}
          post_id={props.post_id}
        />
      </div>
    );
  }