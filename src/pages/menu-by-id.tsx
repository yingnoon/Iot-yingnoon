import { Alert, Button, Container, Divider } from "@mantine/core";
import Layout from "../components/layout";
import { Link, useParams } from "react-router-dom";
import { Menu } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconEdit } from "@tabler/icons-react";

export default function MenuByIdPage() {
  const { menuId } = useParams();

  const { data: menu, isLoading, error } = useSWR<Menu>(`/menus/${menuId}`);

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

                </div>
              </div>

              <Divider className="mt-4" />

              <Button
                color="blue"
                size="xs"
                component={Link}
                to={`/menus/${menu.id}/edit`}
                className="mt-4"
                leftSection={<IconEdit />}
              >
                แก้ไขข้อมูลเมนู
              </Button>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
