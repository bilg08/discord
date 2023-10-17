import { UploadDropzone } from "@/lib/upload-thing";
import { X } from "lucide-react";
import "@uploadthing/react/styles.css";
import Image from "next/image";

interface Props {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = ({ endpoint, value, onChange }: Props) => {
  const fileType = value?.split(".")?.pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 absolute top-0 right-0 p-1 rounded-full text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.log(err, "ERROR");
      }}
    />
  );
};
export default FileUpload;
