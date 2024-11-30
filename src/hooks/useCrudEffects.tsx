import { useEffect } from "react";
import { message } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { Contract, DataTypes } from "../types";

export function useCrudEffects({
  isSuccessUpdate,
  dataUpdate,
  isErrorUpdate,
  uploadFile,
  isSuccess,
  data,
  isError,
  courseId,
  FormData,
  open,
  setOpen,
  form,
  setCreateData,
  createData,
  setUpdateData,
}: {
  isSuccessUpdate: boolean;
  dataUpdate: any;
  isErrorUpdate: boolean;
  uploadFile: any;
  isSuccess: boolean;
  data: any;
  isError: boolean;
  courseId: number;
  FormData: Contract;
  open: boolean;
  setOpen: (open: boolean) => void;
  form: FormInstance;
  setCreateData: (data: DataTypes | ((prev: any) => any)) => void;
  createData: DataTypes;
  setUpdateData: any;
}) {
  useEffect(() => {
    if (isSuccessUpdate && dataUpdate) {
      message.success("Shartnoma muvaffaqiyatli tahrirlandi");
      setOpen(false);
      form.resetFields();
      setUpdateData({});
    }
    if (isErrorUpdate) {
      message.error("Shartnoma tahrirlashda xatolik yuz berdi");
      setUpdateData({});
    }
  }, [isSuccessUpdate, dataUpdate, isErrorUpdate]);

  useEffect(() => {
    if (uploadFile) {
      setCreateData({
        ...createData,
        attachment: {
          origName: uploadFile.data[0].fileName,
          url: uploadFile.data[0].path,
          size: uploadFile.data[0].size,
        },
      });
    }
    if (isSuccess && data) {
      message.success("Shartnoma muvaffaqiyatli yaratildi");
      setOpen(false);
      form.resetFields();
    }
    if (isError) {
      message.error("Shartnoma yaratishda xatolik yuz berdi");
      form.resetFields();
    }
  }, [uploadFile, data, isSuccess, isError]);

  useEffect(() => {
    if (FormData) {
      form.setFieldsValue({
        title: FormData?.title,
        courseId: FormData?.course?.id,
      });

      setCreateData({
        ...createData,
        attachment: FormData?.attachment,
        title: FormData?.title,
        courseId: FormData?.course?.id,
      });
    }
  }, [FormData]);

  useEffect(() => {
    if (courseId) {
      setCreateData((prev: any) => ({ ...prev, courseId: Number(courseId) }));
    }
  }, [courseId]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open]);
}
