import { Link } from 'react-router-dom';
import { DashBlock } from '../../components/dash-block';
import Head from '../../components/head';
import VirtualMachinePanel from '../../components/virtual-machine-panel';
import useVirtualMachines from '../../hooks/use-virtual-machines';
import { ROUTES } from '../../constants/pages';

export default function VirtualMachinesPage() {
  const { virtualmachines, error, isLoading } = useVirtualMachines();

  const virtualMachineEntries = Object.entries(virtualmachines ?? {});

  return (
    <>
      <Head title="Your Virtual Machines" />
      <DashBlock header="Your Virtual Machines">
        <p className="mt-4 text-gray-500 font-400">
          You can deploy a new virtual machine{' '}
          <Link to={ROUTES.deploy} className="underline hover:text-gray-700">
            here
          </Link>
          .
        </p>
      </DashBlock>
      {virtualMachineEntries.length > 0 && (
        <DashBlock>
          <ul className="flex flex-col gap-4">
            {virtualMachineEntries.map(([id, vm]) => (
              <VirtualMachinePanel key={id} vm={{ ...vm, id }} />
            ))}
          </ul>
        </DashBlock>
      )}
      {!error && !isLoading && virtualMachineEntries.length === 0 && (
        <DashBlock>
          <div className="h-40 flex flex-col items-center justify-center">
            <div className="i-tabler-zoom-exclamation mb-4 text-4xl" />
            No virtual machines registered.
          </div>
        </DashBlock>
      )}
    </>
  );
}
