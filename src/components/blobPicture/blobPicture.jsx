import React, { useState, useEffect } from "react";

const BlobPicture = () => {
  const [base64Data, setBase64Data] = useState("");

  useEffect(() => {
    setBase64Data(localStorage.getItem("profile_pic"));
  }, [localStorage.getItem("profile_pic")]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {base64Data !== "null" && (
        <img src={`${base64Data}`} style={{ height: "100%", width: "100%" }} />
      )}
    </div>
  );
};

export default BlobPicture;
