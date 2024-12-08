import { GrTransaction } from "react-icons/gr";
import { MdLocalShipping, MdStore } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";

import MaterialTable from "@/components/ui/MaterialTable";
import MaterialChart from "@/components/ui/MaterialChart";
import { useProductStore } from "@/stores/ProductStore";

const HomePages = () => {
  const product = useProductStore((state) => state.product);

  return (
    <div className="p-8">
      <h3 className="text-2xl font-semibold">Dashboard</h3>

      {/* Card Start */}
      <div className="mb-2 flex flex-col items-center justify-center gap-4 lg:flex-row">
        {/* Card Transaction */}
        <div>
          <div className="border-slate-200 relative flex w-56 flex-col rounded-lg border bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-x-4">
                <GrTransaction size={24} />
                <h5 className="text-slate-800 text-xl font-semibold">
                  Transaksi
                </h5>
              </div>
              <div className="flex justify-center">
                <h3 className="text-slate-600 text-7xl font-light leading-normal">
                  120
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Card Supplyer */}
        <div>
          <div className="border-slate-200 relative flex w-56 flex-col rounded-lg border bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <MdLocalShipping size={24} />
                <h5 className="text-slate-800 text-xl font-semibold">
                  Supplyer
                </h5>
              </div>
              <div className="flex justify-center">
                <h3 className="text-slate-600 text-7xl font-light leading-normal">
                  120
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* Card Transaction success */}
        <div>
          <div className="border-slate-200 relative flex w-56 flex-col rounded-lg border bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-x-4">
                <FaHandHoldingUsd size={24} />
                <h5 className="text-slate-800 text-xl font-semibold">
                  Transaksi
                </h5>
              </div>
              <div className="flex justify-center">
                <h3 className="text-slate-600 text-7xl font-light leading-normal">
                  120
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* Card Product */}
        <div>
          <div className="border-slate-200 relative flex w-56 flex-col rounded-lg border bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-x-4">
                <MdStore size={24} />
                <h5 className="text-slate-800 text-xl font-semibold">
                  Transaksi
                </h5>
              </div>
              <div className="flex justify-center">
                <h3 className="text-slate-600 text-7xl font-light leading-normal">
                  120
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card End */}

      <h3 className="text-2xl font-semibold">Daftar Transaksi</h3>
      <MaterialTable tableHead={head} tableRows={product} />

      <h3 className="mt-5 text-2xl font-semibold">Statistik Performa</h3>
      <MaterialChart />
    </div>
  );
};

export default HomePages;
