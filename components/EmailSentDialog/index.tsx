import { XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog, DialogContent, Tooltip } from "@mui/material";
import React from "react";
import EmailSent from "../../assets/images/EmailSent.png";
import Image from "next/image";

interface IEmailSentDialogProps {
  open: boolean;
  onClose: () => void;
}

const EmailSentDialog: React.FC<IEmailSentDialogProps> = (props) => {
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
              Chúc mừng bạn vừa đăng ký thành công
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-y-5 justify-center items-center">
            <Image
              src={EmailSent}
              width={450}
              height={450}
              className="my-auto"
            />
            <p className="text-gray-600 text-sm  text-center">
              Chúng tôi vừa gửi một đường link tới email của bạn, hãy nhấn vào
              đường link để hoàn thành thủ tục đăng ký của chúng tôi
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailSentDialog;
