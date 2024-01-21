import { auth } from "@clerk/nextjs";
import Dropzone from "@/components/Dropzone";


function Dashboard() {
  const {userId} = auth();



  return (
    <div>
      <Dropzone />
    </div>
    );
}

export default Dashboard;