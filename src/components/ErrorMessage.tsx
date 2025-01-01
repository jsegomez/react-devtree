const ErrorMessage = ({children}: {children: React.ReactNode}) => {
    return ( 
        <>
            <p className="bg-red-50  text-red-600 font-bold text-sm p-3 rounded-lg">{children}</p>
        </>
     );
}
 
export default ErrorMessage;


