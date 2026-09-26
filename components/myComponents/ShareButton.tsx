"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export const ShareButton = ({
  title,
  text,
  url,
  className,
  iconClassName,
}: {
  title?: string;
  text?: string;
  url?: string;
  className: string;
  iconClassName: string;
}) => {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;
    const shareText = text || "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return (
    <Button
      size={"none"}
      variant={"none"}
      onClick={handleShare}
      className={`${className}`}
    >
      <Share2 className={`${iconClassName}`} />
    </Button>
  );
};
