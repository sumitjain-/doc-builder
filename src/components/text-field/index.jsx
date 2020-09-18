import React from 'react';
import {connect} from "react-redux";

export default connect(store => store)(function TextField(props) {
    const {item: obj, previewContainerRef, idx, dispatch} = props;
    const [dragPosition, setDragPosition] = React.useState(null);
    const [dragOffset, setDragOffset] = React.useState({});
    const textRef = React.useRef(null);

    const position = {left: obj.x, top: obj.y};

    if (dragPosition) {
        position.left = dragPosition.x;
        position.top = dragPosition.y;
    }

    function saveNewPosition() {
        if (dragPosition) {
            dispatch({
                type: 'SET_TEXT_FIELDS',
                payload: [{...obj, ...dragPosition}],
            });
            setDragPosition(null);
            setDragOffset(null);
        }
    }

    return (
        <span key={obj.key} ref={textRef}
              onMouseDown={function (e) {
                  const textRect = textRef.current.getBoundingClientRect();
                  const mousePosition = {x: e.clientX, y: e.clientY};
                  setDragOffset({x: mousePosition.x - textRect.x, y: mousePosition.y - textRect.y});
                  setDragPosition({x: obj.x, y: obj.y});
              }}
              onMouseMove={function (e) {
                  if (dragPosition) {
                      const containerRect = previewContainerRef.current.getBoundingClientRect();
                      const x = e.clientX - containerRect.x - dragOffset.x;
                      const y = e.clientY - containerRect.y - dragOffset.y;

                      setDragPosition({x, y});
                  }
              }}
              onMouseLeave={saveNewPosition}
              onMouseUp={saveNewPosition}
              className="position-absolute"
              style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  zIndex: idx + 1,
                  color: obj.color,
                  fontSize: obj.size,
                  fontWeight: obj.bold ? 700 : 400,
                  ...position,
              }}>{obj.previewText || obj.key}</span>
    )
})
