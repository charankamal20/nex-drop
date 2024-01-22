import { auth } from "@clerk/nextjs";
import Dropzone from "@/components/Dropzone";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";

async function Dashboard() {

  const {userId} = auth();
  const docResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docResults.docs.map(doc =>({
    id: doc.id,
    filename: doc.data().fileName || doc.id,
    timestamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
    fullname: doc.data().userName,
    downloadUrl: doc.data().downloadURL,
    type: doc.data().fileType,
    size: doc.data().fileSize,
  }))

  console.log(skeletonFiles);

  return (
    <div className="border-t">
      <Dropzone />
      <section className="container space-y-5">
        <h1 className="font-bold">
          All Files
        </h1>
        <div>
          {/* // * Table Wrapper */}
          <TableWrapper
            skeletonFiles={skeletonFiles}
          />
        </div>
      </section>
    </div>
    );
}

export default Dashboard;