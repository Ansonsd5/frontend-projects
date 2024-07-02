import React, { useEffect, useMemo, useRef, useState } from "react";
import classnames from "classnames";
const Shape = ({ data }) => {
  const boxes = useMemo(() => data.flat(Infinity), [data]);
  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnloading] = useState(false);
  const timerRef = useRef(null);
  const countOfVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, box) => {
      if (box === 1) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]);

  const handleBoxClick = (e) => {
    const { target } = e;
    let index = target.getAttribute("data-index");
    let status = target.getAttribute("data-status");
    if (index === null || status === "hide" || unloading) return;

    setSelected((prev) => {
      return new Set(prev.add(index));
    });
  };

  const unload = () => {
    const keys = Array.from(selected.keys());

    const removeNextMove = () => {
      if (keys.length) {
        const currentkey = keys.shift();

        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentkey);
          console.log(updatedKeys);
          return updatedKeys;
        });
        timerRef.current = setTimeout(removeNextMove, 500);
      } else {
        setUnloading(false);
        console.log("timet", timerRef.current);
        clearTimeout(timerRef.current);
      }
    };
    timerRef.current = setTimeout(removeNextMove, 100);
  };
  useEffect(() => {
    if (selected.size >= countOfVisibleBoxes) {
      setUnloading(true);
      unload();
    }
  }, [selected]);

  return (
    <div className="boxes" onClick={(e) => handleBoxClick(e)}>
      {boxes.map((box, index) => {
        const status = box === 1 ? "visible" : "hide";
        const isSelected = selected.has(index.toString());
        return (
          <div
            key={`${box}-${index}`}
            data-index={index}
            data-status={status}
            className={classnames(
              "box",
              status,
              isSelected && "selected",
              unloading && "disable-click",
            )}
          ></div>
        );
      })}
    </div>
  );
};

export default Shape;
