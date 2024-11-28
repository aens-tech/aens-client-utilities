import { Progress as NUProgress } from "@nextui-org/progress";

interface ScreenProps {
    progress: { total: number; current: number };
    barName: string;
    heading: string;
    description: string;
    fields: string;
    children: React.ReactNode;
    button: React.ReactNode;
    back?: React.ReactNode;
}

const Progress = ({ total, current, barName }: { total: number; current: number; barName: string; }) => {
    return (
        <NUProgress
            label={barName}
            size="md"
            value={current}
            maxValue={total}
            color="primary"
            formatOptions={{ style: "percent" }}
            showValueLabel={true}
            className="w-full"
            classNames={{
                label: "font-bold",
                base: "mb-8"
            }}
        />
    )
}

export default function FormityProgressLayout({ progress, children, barName, button, back, description, fields, heading }: ScreenProps) {
    return (
        <>
            {/* <div className="relative flex flex-col h-full w-full">
                <Progress total={progress.total} current={progress.current} barName={barName} />
                <div className="space-y-4 pt-2">
                    {children}
                    {button}
                </div>

                {back && (
                    <div className="absolute left-4 top-5 origin-top-left">{back}</div>
                )}
            </div> */}


            <div className="relative flex h-full w-full items-center justify-center p-0">
                <div className="w-full shrink-0">

                    <Progress total={progress.total} current={progress.current} barName={barName} />
                    <h1 className="mb-3 text-center text-3xl font-medium text-default-900">
                        {heading}
                    </h1>
                    <p className="mb-6 text-center text-base text-neutral-500">
                        {description}
                    </p>
                    <div className="scrollbar-hide mb-4 max-h-96 overflow-auto">
                        <div className="space-y-4 pt-2">{children}</div>
                    </div>
                    <div className=" flex flex-row space-x-2">
                        {back && (
                            <div className="">{back}</div>
                        )}
                        {button}

                    </div>
                </div>
            </div>
        </>
    );
}