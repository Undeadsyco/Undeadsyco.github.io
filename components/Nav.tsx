import Link from "next/link";

const Nav = () => (
  <nav className='nav'>
    <ul>
      <li><Link href={'/'}>Home</Link></li>
      <li>About</li>
      <li><Link href={'/projects'}>Projects</Link></li>
      
      <li className="dropdown"> More
        <ul className="dropdown-content">
          <li>Blog</li> 
          <li><Link href={'/ark'}>Ark</Link></li>
        </ul>
      </li>
    </ul>
    <ul>
      <li>Contact</li>
    </ul>
  </nav>
);

export default Nav;