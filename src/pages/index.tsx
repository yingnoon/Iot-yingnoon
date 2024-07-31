import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import ajPanwitImage from "../assets/images/aj-panwit.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";
import bnktImage from "../assets/images/bnkt.png";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
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
        <h1>ปัจจุบันคาเฟ่ และห้องสมุดของเรา อยู่ในช่วงการดูแลของ</h1>
        <h2>ผู้ดูแลร้านอันดับ 1 (อู้เก่ง)</h2>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
            นายคนนี้ชื่อ นายกิตติภณ ทัศนเปรมสิน รหัสนักศึกษา 65070021 นักศึกษาชั้นปีที่ 3 ได้เข้ารับการฝึกงานที่ IoT Library & Cafe นี้โดยได้รับการรับรองจาก 
            ผศ.ดร. ปานวิทย์ ธุวะนุติ และนายกฤตณัฏฐ์ ศิริพรนพคุณ ให้เข้ามาเป็นผู้ดูแลร้านอันดับ 1 ของร้านนี้ โดยเขามีความสามารถในการดูแลร้านและห้องสมุดของเราอย่างมืออาชีพ
            (การอู้) โดยทางร้านเรามีบริการอาหารและเครื่องดื่มที่อร่อย และมีหนังสือที่หลากหลายให้คุณได้อ่านและเรียนรู้เรื่องใหม่ๆ ซึ่งเครื่องดื่มต่างๆ ราคาค่อนข้างถูก(มั้ง) อาหารก็อร่อย(แหละ)
            ระหว่างที่นายคนนี้ดูแลร้านนายคนนี้ได้ตั้งใจทำงาน(นอน) และดูแลลูกค้าเป็นอย่างดีเสมอมา(ด่าทั้งร้าน) และเป็นคนที่มีความสุภาพและเป็นกันเองกับลูกค้าทุกคน(แต่ก็ด่าทั้งร้าน)
            สุดท้ายขอให้ระวังบุคคลดักล่าวไว้ด้วยนะครับ เนื่องจากผศ.ดร. ปานวิทย์ ธุวะนุติ และนายกฤตณัฏฐ์ ศิริพรนพคุณ ได้เตะตูดไล่ออกจากร้านไปแล้ว อิอิ
          </p>

          <div>
            <img src={bnktImage} alt="bnkt" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center">
        <img src={coffeeImage} alt="Coffee" className="w-full" />
      </section>
    </Layout>
  );
}
