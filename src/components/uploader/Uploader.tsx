import { IoIosCloudUpload } from "react-icons/io";
import { Button, message, Upload } from "antd";
import { useUploaderMutation } from "../../redux/api/allPeople-api";
import { useEffect } from "react";

const App: React.FC<{ setUploadFile: any }> = ({ setUploadFile }) => {
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
