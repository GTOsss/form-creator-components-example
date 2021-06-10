/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import cx from 'clsx';
import { Controller } from 'effector-react-form';

const LabelText = ({ label }: { label: React.ReactNode }) => {
  if (label) {
    return <span className="checkbox__labelText">{label}</span>;
  }

  return null;
};

// aliases: чекбокс

type PublicProps = {
  label?: React.ReactNode; // лейбл
  reverse?: boolean; // перевернутый
};

type Props = PublicProps & {
  controller: Controller;
  onChange?: (value?: boolean) => void;
};

const Checkbox: React.FC<Props> = ({ label, reverse, controller, onChange: onChangeProp }) => {
  const {
    input: { value, ...inputRest },
  } = controller();

  const onChange = useCallback(
    (e) => {
      const { checked: currentValue } = e.target;
      if (onChangeProp) {
        onChangeProp(currentValue);
      }
      inputRest.onChange(currentValue);
    },
    [onChangeProp],
  );

  return (
    <div className={cx('Checkbox', 'card')}>
      <label className={cx('checkbox__label', { 'f-rr': !reverse })}>
        {label && <LabelText label={label} />}
        <input
          {...inputRest}
          onChange={onChange}
          checked={value || false}
          type="checkbox"
          className="checkbox__input"
        />
        <span className={cx('checkbox__iconWrap', !reverse ? 'mr-2' : 'ml-2')}>
          <svg
            className="checkbox__icon"
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.81818 1.90912L3.88068 7.84662L1.18182 5.14776"
              stroke="#4BB7D4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </label>
    </div>
  );
};

export default React.memo(Checkbox);
