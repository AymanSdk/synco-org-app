import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateChannelModal = () => {
  const [open, setOpen] = useCreateChannelModal();
  const [name, setName] = useState("");

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            value={name}
            disabled={false}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g. dev-talk"
          />
          <div className="flex justify-end">
            <Button disabled={false} className="bg-[#5C3B58]">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
