import Layout from "../../../shared/components/layout";
import CreateEvent from "../components/CreateEvent";

export default function CreateEventsPage() {
  return (
    <Layout user={{
      name: "",
      email: ""
    }}>
      <CreateEvent/>
    </Layout>
  );
}