import { twMerge } from 'tailwind-merge';

interface BoxPros {
	children: React.ReactNode;
	className?: string;
}
const Box = ({ children, className }: BoxPros): React.ReactNode => {
	return (
		<div
			className={twMerge(
				`
        bg-neutral-900
          rounded-lg 
          rounded-lg
          h-fit
          w-full
        `,
				className
			)}
		>
			{children}
		</div>
	);
};

export default Box;
