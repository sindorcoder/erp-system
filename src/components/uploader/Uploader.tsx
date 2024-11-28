import { IoIosCloudUpload } from "react-icons/io";
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: `${import.meta.env.VITE_BASE_URL_UPLOAD}`,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} Fayl Muvaffaqiyatli Biriktirildi.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} Fayl Biriktirishda xatolik.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const App: React.FC = () => (
  <Dragger {...props}>
    <div className="flex items-center gap-5 justify-center text-[#0EB182]">
      <IoIosCloudUpload  size={30}/>
    <p className="text-lg text-[#0EB182]">Fayl Biriktiring</p>
    </div>
  </Dragger>
);

export default App;