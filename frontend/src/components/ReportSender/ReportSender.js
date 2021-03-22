import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReport } from '../../actions/reportActions';
import { Button, IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import './ReportSender.css';
import { Avatar } from '@material-ui/core';
import axios from 'axios';
import { Spinner } from '@chakra-ui/spinner';

function MessageSender() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  async function handleSubmit() {
    dispatch(createReport({ description, image }));
  }

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={userInfo.avatar} />
        <form>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="messageSender__input"
            placeholder={`Mau lapor apa, ${userInfo.name}?`}
          />
          <div className="messageSender__buttons">
            <input
              accept="image/*"
              onChange={handleImageUpload}
              className="d-none"
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <input
              className="d-none"
              value={image}
              disabled={true}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              placeholder="URL Gambar"
            />
            <Button color="primary" onClick={handleSubmit} type="submit">
              {uploading ? <Spinner size="sm" /> : 'Kirim'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessageSender;
