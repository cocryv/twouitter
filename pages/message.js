import React from 'react';
import Link from 'next/link'

const message = () => {
    return (
        <div>
            <Link href="/">
                Visitez le blog
            </Link>
        </div>
    );
};

export default message;