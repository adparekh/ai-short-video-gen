import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">
            Generating Video
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Please stay on the page while we generate your video.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="bg-white flex flex-col items-center justify-center my-10">
          <Image
            src={"/progress.gif"}
            alt="Loading"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h2>Generating Video... Stay on page</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
