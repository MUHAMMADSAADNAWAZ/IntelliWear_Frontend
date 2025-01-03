import { Link } from 'react-router-dom';
import { ROUTE_HOME } from '@routes/constants';

import "./NotFound.css"

const NotFound = () => {
  return (
    <div className="error-page flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="container">
        <div className="eyes">
          <div className="eye">
            <div className="eye__pupil eye__pupil--left"></div>
          </div>
          <div className="eye">
            <div className="eye__pupil eye__pupil--right"></div>
          </div>
        </div>

        <div className="error-page__heading">
          <h1 className="error-page__heading-title">Looks like you're lost</h1>
          <p className="error-page__heading-desciption">404 - page not found</p>
        </div>

        <Link className="error-page__button" to={ROUTE_HOME}>
          back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
