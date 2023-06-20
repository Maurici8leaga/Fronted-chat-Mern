import Header from '@molecules/header/Header';
import Sidebar from '@molecules/sidebar/Sidebar';

const Social = () => (
  <>
    <Header />
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>
    </div>
  </>
);

export default Social;
