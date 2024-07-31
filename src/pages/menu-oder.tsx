import Layout from "../components/layout";
import {  useParams } from "react-router-dom";
import { Menu } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Order } from "../lib/models";

export default function OrderCreatePage() {
    const navigate = useNavigate();
  
    const [isProcessing, setIsProcessing] = useState(false);

    const orderCreateForm = useForm({
        initialValues:{
            name:"",
            price:0,
            total:1,
            note:"",
        },
        validate:{
            name:isNotEmpty("กรุณาระบุชื่อเมนู"),
            price:isNotEmpty("กรุณาระบุราคา"),
            total:isNotEmpty("กรุณาระบุจำนวน"),
            note:isNotEmpty("กรุณาระบุหมายเหตุ ไม่มีใส่ -"),
        },
    });

    const { menuId } = useParams();

    const { data: menu, isLoading, error } = useSWR<Menu>(`/menus/${menuId}`);
    const [isSetInitialValues, setIsSetInitialValues] = useState(false);

    const handleSubmit = async (values: typeof orderCreateForm.values) => {
        try {
          setIsProcessing(true);
          const ordernow = {
            name: values.name,
            total: values.total,
            price: values.price * values.total,
            note: values.note,
            };
        
          await axios.post<Order>(`/orders`, ordernow);
          notifications.show({
            title: "สั่งอาหารสำเร็จ",
            message: "อาหารได้เพิ่มในรายการเรียบร้อยแล้ว",
            color: "teal",
          });
          navigate(`/menus`);
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

      useEffect(() => {
        if (!isSetInitialValues && menu) {
            orderCreateForm.setValues(menu);
            setIsSetInitialValues(true);
        }
      }, [menu, isSetInitialValues, orderCreateForm]);

    return (
        <>
        <Layout>
            <Container className="mt-4">
            {/* You can use isLoading instead of !menu */}
            {isLoading && !error && <Loading />}
            {error && (
                <Alert
                color="red"
                title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
                icon={<IconAlertTriangleFilled />}
                >
                {error.message}
                </Alert>
            )}

            {!!menu && (
                <>
                <h1>{menu.name}</h1>
                <p className="italic text-neutral-500 mb-4">ราคา {menu.price} บาท</p>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <img
                    src="https://placehold.co/150x200"
                    alt={menu.name}
                    className="w-full object-cover aspect-[3/4]"
                    />
                    <div className="col-span-2 px-4 space-y-2 py-4">
                        <h3>รายละเอียดเมนู</h3>
                        <p className="indent-4">
                            {menu.detail}
                        </p>

                        <h3>ส่วนผสม</h3>
                        <p className="indent-4">
                            {menu.ingredient}
                        </p>
                        <form onSubmit={orderCreateForm.onSubmit(handleSubmit)} className="space-y-8">
                            <TextInput
                            label="ชื่อเมนู"
                            placeholder="ชื่อเมนู"
                            {...orderCreateForm.getInputProps("name")}
                            readOnly
                            style={{ display: 'none' }}
                            />

                            <NumberInput
                            label="จำนวน"
                            placeholder="จำนวน"
                            min={1}
                            {...orderCreateForm.getInputProps("total")}
                            />

                            <NumberInput
                            label="price"
                            placeholder="price"
                            readOnly
                            {...orderCreateForm.getInputProps("price")}
                            style={{ display: 'none' }}
                            />

                            <TextInput
                              label="หมายเหตุ"
                              placeholder="หมายเหตุ"
                              {...orderCreateForm.getInputProps("note")}
                            />
                            <Divider />
                            <Button type="submit" loading={isProcessing}>
                                สั่งอาหาร
                            </Button>
                        </form>
                    </div>
                </div>

                <Divider className="mt-4" />

                </>
            )}
            </Container>
        </Layout>
        </>
    );
    }
