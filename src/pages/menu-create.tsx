import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { Button, Checkbox, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Menu } from "../lib/models";
export default function MenuCreatePage() {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const menuCreateForm = useForm({
    initialValues: {
        name: "",
        price: 0,
        detail: "",
        ingredient: "",
        is_published: false,
    },

    validate: {
        name: isNotEmpty("กรุณาระบุชื่อเมนู"),
        price: isNotEmpty("กรุณาระบุราคา"),
        detail: isNotEmpty("กรุณาระบุรายละเอียดเมนู"),
        ingredient: isNotEmpty("กรุณาระบุส่วนผสม"),
    },
  });

  const handleSubmit = async (values: typeof menuCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await axios.post<Menu>(`/menus`, values);
      notifications.show({
        title: "เพิ่มข้อมูลเมนูสำเร็จ",
        message: "ข้อมูลเมนูได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/menus/${response.data.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-8">
          <h1 className="text-xl">เพิ่มเมนูในระบบ</h1>

          <form onSubmit={menuCreateForm.onSubmit(handleSubmit)} className="space-y-8">
            <TextInput
              label="ชื่อเมนู"
              placeholder="ชื่อเมนู"
              {...menuCreateForm.getInputProps("name")}
            />

            <NumberInput
              label="ราคา"
              placeholder="ราคา"
              min={0}
              {...menuCreateForm.getInputProps("price")}
            />
            <TextInput
              label="รายละเอียดเมนู"
              placeholder="รายละเอียดเมนู"
              {...menuCreateForm.getInputProps("detail")}
            />

            <TextInput
              label="ส่วนผสม"
              placeholder="ส่วนผสม"
              {...menuCreateForm.getInputProps("ingredient")}
            />

            <Checkbox
              label="เผยแพร่"
              {...menuCreateForm.getInputProps("is_published", {
                type: "checkbox",
              })}
            />

            <Divider />

            <Button type="submit" loading={isProcessing}>
              บันทึกข้อมูล
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
}
