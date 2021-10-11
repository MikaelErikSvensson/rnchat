import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { decrement, increment, selectCount, incrementByAmount, decrementByAmout } from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const count = useAppSelector(selectCount); // current state för count
  const dispatch = useAppDispatch(); // tar emot en reducer som beskriver hur state ska ändras

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </button>
        <div>
          <button
            className={styles.button}
            onClick={() => {
              dispatch(incrementByAmount(3));
            }}
          >
            Add by amount
          </button>{" "}
          <button
            className={styles.button}
            onClick={() => {
              dispatch(decrementByAmout(5));
            }}
          >
            Remove by amount
          </button>
        </div>
      </div>
    </div>
  );
}
