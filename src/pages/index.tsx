import Header from '../components/Header';
import LoginYouTube from '../components/LoginYoutube';

export default function Home() {
  return (
    <div className="container py-5">
      <Header />
      <main>
        <div className="row">
          <div className="col col-12 col-md-6 py-2">
            <LoginYouTube />
          </div>
        </div>
      </main>
    </div>
  );
}
