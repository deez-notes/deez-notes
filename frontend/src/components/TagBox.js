import { Stack, TextField, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { Box } from "@mui/system";
import React, {useState, useRef} from "react";
import css from "../styles/TagBox.module.scss";
import box from "../styles/Create.module.scss";

const Tags = ({data, handleDelete}) => {
    return <Box className={css.boxoftags}>
        <Stack direction="row" gap={1}>
            <Typography>{data}</Typography>
            <Cancel sx={{cursor:"pointer"}} onClick={() => {handleDelete(data);}}/>
        </Stack>
    </Box>
}

function TagBox()
{   
    const [tags, setTags] = useState([]);
    const tagRef = useRef();
    const handleOnSubmit = (e) => {
        e.preventDefault();

        // TODO: REPLACE LIMIT BY USING A FLEXBOX FOR THE TAG LIST
        if (tags.length < 11)
        {
            setTags([...tags, tagRef.current.value]);
            tagRef.current.value = "";
        }
    };

    const handleDelete = (value) => {
        const newtags = tags.filter((val) => val !== value);
        setTags(newtags);
    }

    return (<div>
        <Stack direction="row" className={css.tags}>
            {tags.map((data, index) => {
                return <Tags data={data} handleDelete={handleDelete} key={index}/>;
            })}
        </Stack>
    <Box className={css.box}>
        <form className={box.descriptionBox} onSubmit={handleOnSubmit}>
        <TextField inputRef={tagRef} fullWidth variant="standard" className={css.textbox}
        placeholder="Enter tags here!"></TextField>
        </form>
    </Box>
    </div>);
}

export default TagBox;
