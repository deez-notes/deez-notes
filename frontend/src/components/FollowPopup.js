import React, {useState, useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProfileBar from './ProfileBar';
import { Stack } from '@mui/material';


// the idea is to pass an array of usernames into this badboy
function FollowPopup(props) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
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
            {/* {props.data.join('\n')} */}
            <Stack direction="column" spacing={2}>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
                <ProfileBar username="amusedCheese1" fullname="Sir Amused Cheese III" src="https://cdn.vox-cdn.com/thumbor/GRUqJHYcBtuPVj1o9yaySECxpQI=/0x0:711x400/1200x800/filters:focal(337x95:449x207)/cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png"></ProfileBar>
                <ProfileBar username="laughingDairy2" fullname="Chuckling Cow" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"></ProfileBar>
            </Stack>
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