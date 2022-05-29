
import PostStack from "./PostStack.js"
import '../styles/scrollBar.css'
import * as React from 'react';
 import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';



// export default function PostPopper() {
//   const [open, setOpen] = React.useState(false);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     setOpen((previousOpen) => !previousOpen);
    
//   };



//   const canBeOpen = open && Boolean(anchorEl);
//   const id = canBeOpen ? 'transition-popper' : undefined;


//   return (
//     <div>
//       <Button aria-describedby={id} variant="contained" onClick={handleClick}
      
//       >
//         Toggle Popper
//       </Button>
//       <br/>
//       <Popper id={id} open={open} anchorEl={anchorEl} transition>
//         {({ TransitionProps }) => (
//           <Fade {...TransitionProps} timeout={400}>

            
//             <Box className = "scrollbar-hidden"
//               sx={{
//                 height: '680px',
//                 overflowY: 'auto',
//             }}
//             >
                
                
//                 <PostStack  numCols={2} numPosts={6} show="user" user={localStorage.getItem('userData')}/>
                
                

//             </Box>
            
            
//           </Fade>
//         )}
//       </Popper>
//     </div>
//   );
// }


export default function PostPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
      <Box className = "scrollbar-hidden"
              sx={{
                height: '680px',
                overflowY: 'auto',
            }}
            >
                
                
                <PostStack  numCols={2} numPosts={6} show="user" user={localStorage.getItem('userData')}/>
                
                

            </Box>
      </Popper>
    </div>
  );
}