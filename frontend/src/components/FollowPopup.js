import React, {useState, useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProfileBar from './ProfileBar';
import { Stack } from '@mui/material';
import axios from 'axios';
import UserList from './UserList';


// the idea is to pass an array of usernames into this badboy
function FollowPopup(props) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [following, setFollowing] = useState([]);
  const [follower, setFollowers] = useState([]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    
    axios.get('http://localhost:8000/users/?user=' + props.username)
    .then((res) => {
      let data = res.data;
      setFollowing(data.following);
      setFollowers(data.followers);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen('paper')}>{props.title}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <UserList following={following} followers={follower} data={props.title}/>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default FollowPopup;