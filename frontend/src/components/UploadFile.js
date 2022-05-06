import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import css from '../styles/UploadFile.module.scss';


const UploadFile = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

    const onInputChange = (event) => {
        setFiles(event.target.files)
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }

        // THIS HERE NEEDS TO BE CHANGE TO CONNECT TO MONGODB????
        axios.post('//localhost:5000/upload', data)
            .then((response) => {
                toast.success('Upload Success');
                onSuccess(response.data)
            })
            .catch((event) => {
                toast.error('Upload Error')
            })
    };

    return (
        <div className={css.wrapper}> 
            <form method="post" action="#" id="#" onSubmit={onSubmit}>
                <div className={css.uploadPrompt}>
                    <label>Upload Your File </label>
                </div>
                <div className= {css.inputItself}> 
                    <input className = 'chose-files-btm' type="file" onChange={onInputChange} multiple/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default UploadFile;