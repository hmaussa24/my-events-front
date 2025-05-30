import Layout from "../../../shared/components/layout";
import Sessions from "../components/AddSession";

export default function SessionPage() {
  return (
    <Layout user={{
      name: "",
      email: ""
    }}>
      <Sessions />
    </Layout>
  );
}