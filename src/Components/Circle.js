import React, { memo } from 'react';
import clsx from 'clsx';
import './Circle.css';

const Circle = memo(({isSelected, handleClick}) => {
    const classnames = clsx('circle-dot', isSelected && 'selected')
    return (
        <div className={classnames} onClick={handleClick} />
    );
});

export default Circle;