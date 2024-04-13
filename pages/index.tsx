import Image from "next/image";
import profilePic from '../public/IMG_3643.jpg';

export default function Home() {
  return (
    <main className="main-page">
      <div>
        <h1 className="title">Hello world!</h1>
        <p className=""></p>
      </div>
      <Image src={profilePic} alt="Profile Picture" width={300} />

    </main>
  )
}
