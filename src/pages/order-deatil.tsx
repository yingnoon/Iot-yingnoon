import { Alert, Button, Container, Divider } from "@mantine/core";
import Layout from "../components/layout";
import { useParams, useNavigate } from "react-router-dom";
import { Order } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";


export default function OrderDetail() {
  const { orderId } = useParams();

  const { data: order, isLoading, error } = useSWR<Order>(`/staffs/${orderId}`);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/staffs/${orderId}`);
      notifications.show({
        title: "ลบออเดอร์สำเร็จ",
        message: "ลบออเดอร์นี้ออกจากระบบเรียบร้อยแล้ว",
        color: "red",
      });
      navigate("/staffs");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          notifications.show({
            title: "ไม่พบข้อมูลออเดอร์",
            message: "ไม่พบข้อมูลออเดอร์ที่ต้องการลบ",
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
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-4">
          {/* You can use isLoading instead of !order */}
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

          {!!order && (
            <>
              <h1>{order.name}</h1>
              <p className="italic text-neutral-500 mb-4">ราคา {order.price} บาท</p>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                  <h3>จำนวน {order.total} ชิ้น</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                  <h3>หมายเหตุ : {order.note}</h3>
              </div>
              <Divider className="mt-4" />
              
              <div className="flex justify-between m-2">
                  <Button
                    color="red"
                    leftSection={<IconTrash />}
                    size="xs"
                    onClick={() => {
                      modals.openConfirmModal({
                        title: "คุณต้องการลบหนังสือเล่มนี้ใช่หรือไม่",
                        children: (
                          <span className="text-xs">
                            เมื่อคุณดำเนินการลบออเดอร์นี้แล้ว จะไม่สามารถย้อนกลับได้
                          </span>
                        ),
                        labels: { confirm: "ลบ", cancel: "ยกเลิก" },
                        onConfirm: () => {
                          handleDelete();
                        },
                        confirmProps: {
                          color: "red",
                        },
                      });
                    }}
                  >
                    ลบออเดอร์นี้
                  </Button>
                </div>
            </>
            
          )}
        </Container>
      </Layout>
    </>
  );
}
