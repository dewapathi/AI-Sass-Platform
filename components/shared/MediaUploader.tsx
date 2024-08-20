import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import {
  CldImage,
  CldUploadWidget,
  CldUploadWidgetPropsChildren,
} from "next-cloudinary";
import Image from "next/image";
import { getImageSize } from "next/dist/server/image-optimizer";
import { dataUrl, getImageSizes } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: "avif" | "webp" | "png" | "jpeg" | string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();
  const onUploadSuccessHandler = (result: any) => {
    const { public_id, width, height, secure_url } = result?.info;

    setImage((prev: any) => ({
      ...prev,
      publicId: public_id,
      width: width,
      height: height,
      secureUrl: secure_url,
    }));

    onValueChange(public_id);

    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted from your account",
      duration: 5000,
      className: "success-toast",
    });
  };

  const onUploadErrorHandler = () => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
    <div className="">
      <h3 className="h3-bold text-dark-600 mb-4">Original</h3>
      <CldUploadWidget
        uploadPreset="AI_Sass_imaginify"
        options={{
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={onUploadSuccessHandler}
        onError={onUploadErrorHandler}
      >
        {({
          cloudinary,
          widget,
          open,
          results,
          error,
        }: CldUploadWidgetPropsChildren) => (
          <div>
            {publicId ? (
              <>
                <div>
                  <CldImage
                    width={getImageSizes(type, image, "width")}
                    height={getImageSizes(type, image, "height")}
                    src={publicId}
                    alt="image"
                    sizes={"(max-width: 767px) 100vw, 50vw"}
                    placeholder={dataUrl as PlaceholderValue}
                    className="media-uploader_cldImage"
                  />
                </div>
              </>
            ) : (
              <div className="media-uploader_cta" onClick={() => open()}>
                <div className="media-uploader_cta-image">
                  <Image
                    src="/assets/icons/add.svg"
                    alt="Add Image"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="p-14-medium">Click here to upload image</p>
              </div>
            )}
          </div>
        )}
        {/* {publicId ? <>HERE IS THE IMAGE</> : <div>HERE IS NO IMAGE</div>} */}
      </CldUploadWidget>
    </div>
  );
};

export default MediaUploader;
