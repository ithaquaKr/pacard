
import "./home.scss";

const Home = () => {
 
  return (

    <div className="home">
      <div className="home-container">
      <div className="home-top">
        <img src={JSON.parse(window.localStorage.getItem('user')).avatar} alt="" className="home-info-img" />
          <div className="home-info">
            <div className="home-info-items">
              <span>name: {JSON.parse(window.localStorage.getItem('user')).username}</span>
            </div>
            <div className="home-info-items">
              <span>email: {JSON.parse(window.localStorage.getItem('user')).email}</span>
            </div>
            <div className="home-info-items">
              <span>about: Something .... ?
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Perspiciatis fuga totam est nesciunt.
              </span>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
