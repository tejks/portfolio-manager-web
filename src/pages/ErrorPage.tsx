import Button from "@/components/common/Button";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error))
        return (
            <div className="grid h-screen place-content-center px-4">
                <div className="text-center">
                    <h1 className="inline-block bg-gradient-to-r from-[#4d3c64] to-[#cacaca] bg-clip-text text-9xl  text-transparent">
                        {error.status}
                    </h1>

                    <p className="mt-8 text-2xl font-bold tracking-tight text-gray-500 sm:text-4xl">Uh-oh!</p>

                    <p className="mt-4 text-gray-500">We can't find that page.</p>

                    <Button type="button" className="mt-8" to="/">
                        Go Back Home
                    </Button>
                </div>
            </div>
        );
    else if (error instanceof Error)
        return (
            <div id="error-page">
                <h1>Oops! Unexpected Error</h1>
                <p>Something went wrong.</p>
                <p>
                    <i>{error.message}</i>
                </p>
            </div>
        );
    else return <></>;
};

export default ErrorPage;
