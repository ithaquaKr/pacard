// import Sidebar from "../../components/sidebar/Sidebar";

import Footer from "../../components/footer/Footer";
import Topbar from '../../components/pg-topbar/pgTopbar';
import "./landingpage.scss";

const Landingpage = () => {
 
  return (
    // <Sidebar/>,
    <div className="landingpg">
      <div className="ldpg-navbar">
        <Topbar/>
      </div>
      <div className="ld-container-1">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum molestiae aperiam repellendus, beatae quisquam veritatis provident blanditiis. Laboriosam libero saepe asperiores dolorum illum totam molestiae cupiditate veritatis deleniti, illo incidunt?
        </p>
      </div>
      <div className="ld-container-2">
        <div className="content">
          <div className="content-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, atque odio, labore dolor dolorum sequi nam alias, dolorem libero hic voluptas esse beatae blanditiis tempore quibusdam quae modi harum iste?
          </div>
          <div className="content-right">
            <img src="/images/bg-left" alt="" />
          </div>
        </div>
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
        

      </div>
      <div className="ldpg-footer">
          <Footer/>
      </div>
    </div>
  );
};

export default Landingpage;
