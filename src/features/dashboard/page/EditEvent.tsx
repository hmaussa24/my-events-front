import Layout from "../../../shared/components/layout";
import EditEvent from "../components/EditEvent";
import { useNavigate } from "react-router-dom";

const EditEventsPage = () => {
    const navigate = useNavigate();
  return (
    <Layout user={{
      name: "",
      email: ""
    }}>
      <EditEvent onCancel={() => navigate(-1)} onSave={() => navigate('/events')}/>
    </Layout>
  );
}

export default EditEventsPage;