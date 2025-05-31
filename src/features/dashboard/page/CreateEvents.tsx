import Layout from "../../../shared/components/layout";
import CreateEvent from "../components/CreateEvent";

const CreateEventsPage = () => {
  return (
    <Layout user={{
      name: "",
      email: ""
    }}>
      <CreateEvent/>
    </Layout>
  );
}

export default CreateEventsPage;