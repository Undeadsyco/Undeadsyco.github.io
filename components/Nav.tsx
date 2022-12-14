import Link from "next/link";

const Nav = () => (
  <nav className='nav'>
    <ul>
      <li><Link href={'/'}>Home</Link></li>
      <li>About</li>
      <li><Link href={'/projects'}>Projects</Link></li>
      <li>Blog</li>
    </ul>
    <ul>
      <li>Contact</li>
    </ul>
  </nav>
);

export default Nav;