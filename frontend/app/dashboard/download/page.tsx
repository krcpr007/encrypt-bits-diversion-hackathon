import React from "react";

import axios from "axios";
import DataTable from "@/components/download/DataTable";

const fetchData = async () => {
  // const { data } = await axios.get("");
  return {
    data: [1, 2, 3, 4, 5],
  };
};

export default async function page() {
  const data = fetchData();

  return (
    <div className="max-w-[1250px] mx-auto my-10 w-11/12 ">
      <p className="mb-10 text-center uppercase font-bold">List of Patients</p>
      <DataTable data={data} />
    </div>
  );
}
