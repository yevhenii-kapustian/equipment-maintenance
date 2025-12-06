const ErrorMessage = ({message}: {message: string}) => {
    return(
        <div className="mt-2 w-full text-xs text-red-700">
            {message}
        </div>
    )
}

export default ErrorMessage