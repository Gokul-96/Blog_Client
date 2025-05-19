const Alert = ({ message, type }) => {
    if (!message) return null;
  

  
    return (
      <div>
        {message}
      </div>
    );
  };
  
  export default Alert;
  