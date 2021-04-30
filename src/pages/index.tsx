import Link from 'next/link';
import Header from '../components/Header';
import LoginFacebook from '../components/LoginFacebook';
import LoginYouTube from '../components/LoginYouTube';

export default function Home() {
  return (
    <div className="container py-5">
      <Header />
      <main>
        <div className="row">
          <div className="col col-12 col-md-6 py-2">
            <LoginYouTube />
          </div>
          <div className="col col-12 col-md-6 py-2">
            <LoginFacebook />
          </div>
          <div className="col col-12">
            <Link href="/livestream/comments">
              <a className="btn btn-outline-dark w-100">Comentários</a>
            </Link>
          </div>
        </div>
      </main>
      <footer className="fixed-bottom text-center">
        <p>Copyright (c) 2020 Cleyson Silva</p>
      </footer>
    </div>
  );
}
