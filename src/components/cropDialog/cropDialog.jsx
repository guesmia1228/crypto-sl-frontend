import React, { useState, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import styles from "./cropDialog.module.css";
import { Buttons } from "../../dashboard/settings/components/buttons";
import "react-image-crop/dist/ReactCrop.css";

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

const CropDialog = ({ open, file, aspect, onSave, onClose }) => {
   const [crop, setCrop] = useState({
      unit: "%",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
   });
   const [zoom, setZoom] = useState(1);
   const [image, setImage] = useState(undefined);
   const [completedCrop, setCompletedCrop] = useState({
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
   });

   useEffect(() => {
      if (open && aspect) {
      }
   }, [open, aspect]);

   useEffect(() => {
      if (open && file) {
         const imageReader = new FileReader();
         imageReader.readAsDataURL(file);
         imageReader.onloadend = () => {
            setImage(imageReader.result);
            const img = new Image();
            img.src = imageReader.result;

            if (aspect) {
               setCrop(
                  centerCrop(
                     makeAspectCrop(
                        {
                           unit: "%",
                           width: 100,
                        },
                        aspect,
                        img.width,
                        img.height
                     ),
                     img.width,
                     img.height
                  )
               );
            }
         };
      }
   }, [open, file]);

   const handleCrop = () => {
      const img = new Image();
      img.src = image;

      img.onload = function () {
         const canvas = document.createElement("canvas");
         const ctx = canvas.getContext("2d");

         const scaleX = img.naturalWidth / img.width;
         const scaleY = img.naturalHeight / img.height;
         const pixelRatio = window.devicePixelRatio;

         canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
         canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

         ctx.scale(pixelRatio, pixelRatio);
         ctx.imageSmoothingQuality = "high";

         const cropX = completedCrop.x * scaleX;
         const cropY = completedCrop.y * scaleY;

         const centerX = img.naturalWidth / 2;
         const centerY = img.naturalHeight / 2;

         ctx.save();

         ctx.translate(-cropX, -cropY);
         ctx.translate(centerX, centerY);
         ctx.scale(zoom, zoom);
         ctx.translate(-centerX, -centerY);
         ctx.drawImage(
            img,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight
         );
         const croppedImageData = canvas.toDataURL("image/jpeg");

         onSave(croppedImageData);
      };
   };

   return open ? (
      <div className={styles["modal-root"]}>
         <div className={styles["modal-mask"]}></div>
         <div className={styles["modal-wrap"]}>
            <div
               className={styles["modal"]}
               style={{ width: 600, height: 600 }}
            >
               <div className={styles["crop-container"]}>
                  <ReactCrop
                     crop={crop}
                     onChange={(_, percentCrop) => setCrop(percentCrop)}
                     zoom={zoom}
                     onComplete={(c) => setCompletedCrop(c)}
                     maxWidth={580}
                     maxHeight={480}
                     aspect={aspect}
                  >
                     <img
                        src={image}
                        style={{
                           transform: `scale(${zoom})`,
                           maxWidth: 580,
                           maxHeight: 480,
                        }}
                     />
                  </ReactCrop>
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
                     functions={[onClose, handleCrop]}
                     buttons={["Keep original image", "Crop"]}
                  />
               </div>
            </div>
         </div>
      </div>
   ) : null;
};

export default CropDialog;
