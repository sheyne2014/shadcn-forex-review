"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BrokerReviewForm } from "@/components/brokers/BrokerReviewForm";

interface ReviewModalProps {
  brokerId: string;
  brokerName: string;
  buttonText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function ReviewModal({ 
  brokerId, 
  brokerName, 
  buttonText = "Write a Review", 
  variant = "default" 
}: ReviewModalProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className="gap-2">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review {brokerName}</DialogTitle>
          <DialogDescription>
            Share your experience with {brokerName} to help other traders make informed decisions.
          </DialogDescription>
        </DialogHeader>
        <BrokerReviewForm
          brokerId={brokerId}
          brokerName={brokerName}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
} 