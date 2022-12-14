import { XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import React from "react";
import PostedCard from "../../designs/PostedCard";

interface IPostedDialogProps {
  open: boolean;
  onClose: () => void;
}

const PostedDialog: React.FC<IPostedDialogProps> = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogContent className="max-h-[600px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Sản phẩm bạn đã đăng
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-y-5">
            <PostedCard title="Air Jordan Dior Travis Scott" status="pending" />
            <PostedCard title="Air Jordan Dior Travis Scott" status="pending" />
            <PostedCard title="Air Jordan Dior Travis Scott" status="pending" />
            <PostedCard title="Air Jordan Dior Travis Scott" status="success" />
            <PostedCard title="Air Jordan Dior Travis Scott" status="success" />
            <PostedCard title="Air Jordan Dior Travis Scott" status="success" />
            <PostedCard title="Air Jordan Dior Travis Scott" status="success" />
            <PostedCard title="Air Jordan Dior Travis Scott" status="success" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostedDialog;
