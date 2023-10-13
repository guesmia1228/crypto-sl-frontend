import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const list = [
  {
    text: "Imprint",
    link: "/imprint",
  },
  {
    text: "Privacy Policy",
    link: "/privacy",
  },
  {
    text: "Terms and Condition",
    link: "/terms",
  },
  {
    text: "Contact us",
    link: "/contact",
  },
];

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul>
        {list.map((item) => (
          <li>
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>

      <p>© 2023 Nefentus. All rights reserved.</p>
    </div>
  );
};

export default Footer;
