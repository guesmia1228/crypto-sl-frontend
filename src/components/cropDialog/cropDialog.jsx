import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import styles from "./cropDialog.module.css";
import { Buttons } from "../../dashboard/settings/components/buttons";

export const dataURLtoFile = (dataurl, filename) => {
   var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
   while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
   }
   return new File([u8arr], filename, { type: mime });
};

const CropDialog = ({ open, file, style, onSave, onClose }) => {
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [cropArea, setCropArea] = useState(null);
   const [image, setImage] = useState(undefined);

   useEffect(() => {
      if (open && file) {
         const imageReader = new FileReader();
         imageReader.readAsDataURL(file);
         imageReader.onloadend = () => {
            setImage(imageReader.result);
         };
      }
   }, [open, file]);

   const onCropComplete = (croppedArea, croppedAreaPixels) => {
      setCropArea(croppedAreaPixels);
   };

   const handleSave = () => {
      const img = new Image();
      img.src = image;

      img.onload = function () {
         const canvas = document.createElement("canvas");
         const ctx = canvas.getContext("2d");
         const { x, y, width, height } = cropArea;
         canvas.width = width;
         canvas.height = height;
         ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
         const croppedImageData = canvas.toDataURL("image/jpeg");
         onSave(croppedImageData);
      };
   };

   return open ? (
      <div className={styles["modal-root"]}>
         <div className={styles["modal-mask"]}></div>
         <div className={styles["modal-wrap"]}>
            <div className={styles["modal"]} style={style}>
               <div className={styles["crop-container"]}>
                  <Cropper
                     image={image}
                     crop={crop}
                     zoom={zoom}
                     aspect={4 / 3}
                     onCropChange={setCrop}
                     onCropComplete={onCropComplete}
                     onZoomChange={setZoom}
                  />
               </div>
               <div className={styles["controls"]}>
                  <input
                     type="range"
                     value={zoom}
                     min={1}
                     max={3}
                     step={0.1}
                     aria-labelledby="Zoom"
                     onChange={(e) => {
                        setZoom(e.target.value);
                     }}
                     className={styles["zoom-range"]}
                  />
               </div>

               <div className={styles["modal-footer"]}>
                  <Buttons
                     functions={[onClose, handleSave]}
                     buttons={["Close", "Save"]}
                  />
               </div>
            </div>
         </div>
      </div>
   ) : null;
};

export default CropDialog;
