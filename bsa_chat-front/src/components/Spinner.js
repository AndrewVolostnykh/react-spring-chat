import React, { Component, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 200);
    }, [isLoading]);

    return isLoading && <CircularProgress />
}