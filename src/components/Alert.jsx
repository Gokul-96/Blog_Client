const Alert = ({ message, type }) => {
    if (!message) return null;
  
    const bgColor =
      type === "success"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";
  
    return (
      <div className={`${bgColor} p-2 rounded mb-4 text-center`}>
        {message}
      </div>
    );
  };
  
  export default Alert;
  