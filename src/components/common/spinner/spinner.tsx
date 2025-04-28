import { CgSpinner } from "react-icons/cg";

interface Props {
	sm?: boolean;
	md?: boolean;
	lg?: boolean;
}

export default function Spinner({ sm, md, lg }: Props) {
	return (
		<div role='status' className="flex items-center flex-col h-screen w-full mt-[100px]">
			<CgSpinner />
			<span className='sr-only'>Loading...</span>
		</div>
	);
}
