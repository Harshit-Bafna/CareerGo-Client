import { useLocation } from 'react-router-dom';

const SentEmail = () => {
    const location = useLocation();
    const SentEmailMessage = location.state?.SentEmailMessage || 'Email sent';

    return <div>{SentEmailMessage}</div>;
};

export default SentEmail