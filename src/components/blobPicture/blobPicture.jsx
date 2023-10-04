import React, { useState, useEffect } from "react";

const BlobPicture = () => {
  const [base64Data, setBase64Data] = useState("");

  useEffect(() => {
    setBase64Data(localStorage.getItem("profile_pic"));
  }, [localStorage.getItem("profile_pic")]);

  return (
    <div>
      {base64Data !== "null" && (
        <img
          src={`${base64Data}`}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
    </div>
  );
};

export default BlobPicture;
