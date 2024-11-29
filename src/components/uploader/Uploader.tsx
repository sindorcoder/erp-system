import { IoIosCloudUpload } from "react-icons/io";
import { Button, message, Upload } from "antd";
import { useUploaderMutation } from "../../redux/api/allPeople-api";
import { useEffect } from "react";
import { GetDataTypes } from "../../types";

const App: React.FC<{ FormDataDoc: GetDataTypes, setUploadFile: any }> = ({ FormDataDoc, setUploadFile }) => {
  const [uploader, { isLoading, data, isSuccess, isError }] =
    useUploaderMutation();

  const handleUpload = ({ file, fileList }: any) => {
    if (file.status !== "loading") {
      const formData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i].originFileObj);
      }
      uploader(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setUploadFile(data);
      message.success("Fayl muvaffaqiyatli yuklandi");
    }
    if (isError) {
      message.error("Fayl yuklashda xatolik yuz berdi");
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="w-full">
      <Upload
        className="!w-full"
        accept=".docx, .doc"
        customRequest={({ onSuccess }: any) => {
          setTimeout(() => {
            onSuccess("ok");
          }, 0);
        }}
        onChange={handleUpload}
        fileList={
          FormDataDoc?.attachment
            ? [
                {
                  name: FormDataDoc?.attachment?.origName,
                  url: FormDataDoc?.attachment?.url,
                  size: FormDataDoc?.attachment?.size,
                },
              ]
            : null
        }
      >
        <Button
          loading={isLoading}
          disabled={isLoading}
          className="!w-full py-5 text-[#0EB182]"
          icon={<IoIosCloudUpload color="#0EB182" />}
        >
          Fayl Biriktiring
        </Button>
      </Upload>
    </div>
  );
};

export default App;
