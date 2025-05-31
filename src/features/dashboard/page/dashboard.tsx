import Layout from "../../../shared/components/layout";
import TableEventos from "../components/TableEventos";

const DashboardPage = () => {
  return (
    <Layout user={{
      name: "",
      email: ""
    }}>
      <TableEventos />
    </Layout>
  );
}

export default DashboardPage;