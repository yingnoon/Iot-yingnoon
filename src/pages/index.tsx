import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import ajPanwitImage from "../assets/images/aj-panwit.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";
import profile from "../assets/images/lnwza.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">IoT Cafe</h1>
        <h2>ร้านหนังสือจิบที่มีกาแฟอ่าน</h2>
      </section>

      <section className="container mx-auto py-8">
        <h1>เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things และนายกฤตณัฏฐ์
            ศิริพรนพคุณ เป็นผู้ช่วยสอนในหัวข้อ FastAPI และ React ในวิชานี้
          </p>

          <div>
            <img src={ajPanwitImage} alt="Panwit Tuwanut" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-8">
        <h1>นางสาวขวัญเนตร ถี่ถ้วน เจ้าของร้านคาเฟ่คนปัจจุบัน</h1>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
            รหัสนักศึกษา 65070027 ชั้นปีที่ 3 ออกแนวลูกคุณหนู หมายถึงแม่ชื่อหนู นิสัยติดแกลมเงินในบัญชีติดลบ เก่งอิ้งพอตัว อย่างสีเหลือง! yellow
            เป็นคนเงียบๆไม่เสียงดัง ชอบความสงบ แอลกอฮอร์ไม่รู้จักเลยชีวิตนี้กินแต่น้ำส้ม
          </p>

          <div>
            <img src={profile} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center">
        <img src={coffeeImage} alt="Coffee" className="w-full" />
      </section>
    </Layout>
  );
}
