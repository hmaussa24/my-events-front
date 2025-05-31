import Layout from "../../../shared/components/layout";
import Sessions from "../components/AddSession";

const SessionPage = () => {
  return (
    <Layout user={{
      name: "",
      email: ""
    }}>
      <Sessions />
    </Layout>
  );
}

export default SessionPage;