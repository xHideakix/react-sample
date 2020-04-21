import React from 'react';
import { Link } from 'react-router-dom';
import './ListItem.css';

export function ListItem(props) {
  const handleDeleteClick = () => {
    props.onAction({
      type: 'delete',
      value: {
        id: props.id,
      },
    });
  }

  return (
    <div className="list-item" >
      <Link to={`/homeworks/${props.id}`}>
        {props.number + '. ' + props.title}
      </Link>
      <button type="button" onClick={handleDeleteClick}>X</button>
    </div>
  );
}