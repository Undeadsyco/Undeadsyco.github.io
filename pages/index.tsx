import Image from "next/image";

export default function Home() {
  return (
    <main className="main-page">
      <div>
        <h1 className="title">Hello world!</h1>
        <p className=""></p>
      </div>
      <Image src={"/IMG_3643.jpg"} alt="Profile Picture" width={300} height={400} />

    </main>
  )
}
