import Cookies from 'js-cookie';
import FacebookLoginBtnService, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import { useFacebookInfo } from '../context/Facebook';

export default function LoginFacebook() {
  const { facebookInfo, setFacebookInfo } = useFacebookInfo();

  const { NEXT_PUBLIC_FACEBOOK_APP_ID } = process.env;

  function responseFacebook(response: ReactFacebookLoginInfo) {
    if (response.accessToken) {
      setFacebookInfo(response);
    }
  }

  function logoutFacebook() {
    Cookies.remove('facebookInfo');
    setFacebookInfo({});
  }

  return facebookInfo?.accessToken ? (
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
      scope="pages_show_list,user_videos"
      textButton="Login com Facebook"
      cssClass="btn btn-lg btn-outline-primary btn-block w-100"
    />
  );
}
