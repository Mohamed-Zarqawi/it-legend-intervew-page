"use client";

import { PDFViewer } from "@/components/extend/pdf-viewer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PdfViewerProps {
  url: string;
}
const PdfViewer = ({ url }: PdfViewerProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">PDF</Button>
        </DialogTrigger>
        <DialogContent
          className="bg-background h-[calc(100dvh-155px)] w-full p-1 md:min-w-4xl md:p-2"
          showCloseButton={false}
        >
          <PDFViewer
            src={url}
            className="h-full w-full rounded-2xl p-0!"
            defaultZoom={"fit-width"}
            showDownload={true!}
            showUpload={false}
            showToolbar={true}
            showRotateControls={false}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PdfViewer;
