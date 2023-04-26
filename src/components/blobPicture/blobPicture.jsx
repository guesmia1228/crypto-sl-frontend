import React, { useState, useEffect } from 'react';

const BlobPicture = () => {
  const [base64Data, setBase64Data] = useState('');

    useEffect(() => {
      setBase64Data(localStorage.getItem("profile_pic"));
  }, [localStorage.getItem("profile_pic")]);

    return (
    <div>
      {base64Data && (
        <img
          src={`data:image/png;base64,${base64Data}`}
          alt="Base64 Image"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default BlobPicture;
