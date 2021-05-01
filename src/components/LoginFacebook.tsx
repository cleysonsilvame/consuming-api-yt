import Cookies from 'js-cookie';
import FacebookLoginBtnService, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import { useIsFacebookLoggedIn } from '../context/Facebook';

export default function LoginFacebook() {
  const { isFacebookLoggedIn, setIsFacebookLoggedIn } = useIsFacebookLoggedIn();

  const { NEXT_PUBLIC_FACEBOOK_APP_ID } = process.env;

  function responseFacebook(response: ReactFacebookLoginInfo) {
    if (response.accessToken) {
      Cookies.set('facebookInfo', response);
      setIsFacebookLoggedIn(true);
    }
  }

  function logoutFacebook() {
    Cookies.remove('facebookInfo');
    setIsFacebookLoggedIn(false);
  }

  return isFacebookLoggedIn ? (
    <button
      className="btn btn-lg btn-outline-danger btn-block w-100"
      onClick={logoutFacebook}
    >
      Sair do facebook
    </button>
  ) : (
    <FacebookLoginBtnService
      appId={NEXT_PUBLIC_FACEBOOK_APP_ID}
      callback={responseFacebook}
      textButton="Login com Facebook"
      cssClass="btn btn-lg btn-outline-primary btn-block w-100"
    />
  );
}
