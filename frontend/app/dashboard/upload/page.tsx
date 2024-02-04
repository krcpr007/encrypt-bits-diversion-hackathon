"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function page() {
  const [images, setImages] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");

  const onDrop = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
    convertToBase64(acceptedFiles);
  };

  const convertToBase64 = (acceptedFiles: any) => {
    acceptedFiles.map((image: any) => {
      setPreviewImage((prev) => [...prev, URL.createObjectURL(image)]);
    });
  };

  const handleUpload = () => {
    if (images.length === 0) {
      return toast.error("Atleast one file is required");
    }
    document.getElementById("key-dialog")?.click();
  };

  return (
    <div className="pt-10 max-w-[1250px] w-11/12 mx-auto">
      <p className="mb-10 font-bold uppercase text-xl">
        Upload your desired image
      </p>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section className="h-[400px] border border-dashed border-black rounded-md mb-10">
            <div
              {...getRootProps()}
              className="w-full h-full flex justify-center items-center"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop to Upload</p>
              ) : (
                <p>Upload or Drag n drop to upload</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>

      <div className="grid grid-cols-[70px_1fr] items-center gap-2 my-5">
        <Label htmlFor="key" className="">
          Name
        </Label>
        <Input
          id="key"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-[400px] w-11/12"
        />
      </div>

      {images.length > 0 && (
        <div className="my-10">
          <p>Selected Images:</p>
          <div className="grid grid-cols-5 gap-5">
            {previewImage.map((image, index) => (
              <Image
                alt="image"
                src={image}
                width={200}
                height={200}
                key={index}
              />
            ))}
          </div>
        </div>
      )}

      <Button onClick={handleUpload} disabled={name === ""}>
        Upload
      </Button>

      <Dialog>
        <DialogTrigger id="key-dialog"></DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="key" className="sr-only">
                Key
              </Label>
              <Input id="key" defaultValue={key} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => {
                try {
                  navigator.clipboard.writeText(key);
                  toast.success("Key copied successfully");
                } catch (error) {
                  toast.error("Failed to copy key");
                }
              }}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
