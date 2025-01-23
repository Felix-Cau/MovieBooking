import { Link } from 'react-router-dom';

function Footer(): JSX.Element {
  return (
    <footer>
      <div className="container mt-auto">
        <Link to='https://youtu.be/TC5WGq4Koak?si=LHCbKDH4w_Nkm23D' className="float-end mt-5" target='_blank'>Customer support!</Link>
      </div>
    </footer>
  );
}

export default Footer;
