import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error))
    return (
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center">
          <h1 className="inline-block bg-gradient-to-r from-[#FB9D1F] to-[#1C5C75] bg-clip-text text-9xl  text-transparent">
            {error.status}
          </h1>

          <p className="text-2xl font-bold tracking-tight text-gray-500 sm:text-4xl mt-8">Uh-oh!</p>

          <p className="mt-4 text-gray-500">We can't find that page.</p>

          {/* <Button type="button" className="mt-8" size="sm" to="/">
            Go Back Home
          </Button> */}
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